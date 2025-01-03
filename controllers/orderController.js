import orderModel from "../models/ordermodel.js"
import UserModel from "../models/usermodel.js"
import Stripe from "stripe"

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const stripe = new Stripe("sk_test_51QYRHLEC0Q46zCHqJ10Y3JerPnf032dJMbmBrTNEeUW3XgqgVIHxP1EG94DmFneenAekGFLH4g4uZrri6ES29TJZ00X2BUgvd6")


const placeOrder = async (req,res)=>{
    const frontendUrl = process.env.FRONTEND_URL



    try{
        let user = req.user

        if(!req.body.orderDetails.address.mobile || !req.body.orderDetails.address.Name || !req.body.orderDetails.address.email || !req.body.orderDetails.address.address || !req.body.orderDetails.address.pincode || !req.body.orderDetails.address.landmark){
            throw new Error("every fields must be filled")
        }

        if(req.body.orderDetails.address.mobile.length!==10){
            throw new Error("mobile should be only 10 digits")
        }

        if(!req.body.orderDetails.address.email.includes("@")){
            throw new Error("Enter valid email format")
        }

        const newOrder = await orderModel.create({
            userId:user._id,
            items:req.body.orderDetails.items,
            amount:req.body.orderDetails.amount,
            address:req.body.orderDetails.address, 
        })
    
        await UserModel.findByIdAndUpdate(user._id, {cartItem:{}})
           
        // line_items are necessary for strip payments, we are creating this with user passed items
        const line_items = req.body.orderDetails.items.map((item)=>({
            price_data: {
                currency: "usd",
                product_data:{
                    name:item.name,
                    description: item.description || "No description",
                },
                unit_amount: item.price*100,
            },
            quantity:item.quantity
        }))

        //  we are adding delivery charges(to cnvert to inr mutliply by 80 eg 2*100*80)
        line_items.push({
            price_data:{
                currency:"usd",
                product_data:{
                    name:"delivery charger"
                },
                unit_amount: 2*100
            },
            quantity:1
        })


        // creatig success and failure url
        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode:'payment',
            success_url: `${frontendUrl}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontendUrl}/verify?success=false&orderId=${newOrder._id}`,
        })
        res.status(201).json({msg:"order placed successfully", ok:true, data: session.url})
    }
    catch(err){
        res.status(400).json({msg: err.message, ok: false})
    }
}



const verifyOrder = async (req, res)=>{
    const {orderId, ok} = req.body
    try{
        if(ok==="true"){
            await orderModel.findByIdAndUpdate(orderId, {payment:true});
            res.status(200).json({ok:true, msg:"paid"})
        }
        else{
            await orderModel.findByIdAndDelete(orderId);
            res.status(200).json({ok:false, msg:"not paid"})
        }
    }
    catch(err){
        res.status(400).json({msg: err.message, ok: false})
    }
}

const userOrders = async (req, res)=>{
    try{
    let user = req.user

    let userOrders = await orderModel.find({userId: user._id})

    if(userOrders.length===0){
        throw new Error("No orders yet")
    }
        res.status(200).json({msg:"orders fetched successfully",ok:true, data: userOrders})
    }
    catch(err){
        res.status(400).json({msg: err.message, ok: false})  
    }
}

export {
    placeOrder,
    verifyOrder,
    userOrders,
}
import Stripe from "stripe"
import orderModel from "../models/ordermodel.js"
import UserModel from "../models/usermodel.js"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const placeOrder = async (req,res)=>{
    const frontendUrl = "http://localhost:5173"

    try{
        let user = req.user
        const newOrder = await orderModel.create({
            userId:user._id,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address,
        })

        await userModel.findByIdAndUpdate(user._id, {cartItems:{}})

        // line_items are necessary for strip payments, we are creating this with user passed items
        const line_items = req.body.items.map((item)=>({
            priceData: {
                currency: "usd",
                productData:{
                    name:item.name
                },
                unitAmount: item.price*100,
            },
            quantity:item.quantity
        }))

        //  we are adding delivery charges(to cnvert to inr mutliply by 80 eg 2*100*80)
        line_items.push({
            priceData:{
                currency:"usd",
                productData:{
                    name:"delevery charger"
                },
                unitAmount: 2*100
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

        res.status(201).json({msg:"", ok:true, data: session.url})
    }
    catch(err){
        console.log(err)
        res.status(400).json({msg: err.message, ok: false})
    }
}

export {
    placeOrder
}
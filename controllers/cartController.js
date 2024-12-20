import FoodModel from "../models/foodmodels.js";
import UserModel from "../models/usermodel.js";

const addToCart = async (req, res)=>{
    try{
        let user = req.user
        let cartItem = await user.cartItem
        
        if(!cartItem[req.body.itemid]){
            
            cartItem[req.body.itemid] = 1   
        }
        else{
            cartItem[req.body.itemid] += 1
        }

        await UserModel.findByIdAndUpdate(user._id,{cartItem})
        res.status(200).json({msg:"cart item added",ok:true })
    }
    catch(err){
        console.log(err)
        res.status(400).json({msg: err.message, ok: false}) 
    }
}

const removeFromCart = async (req, res)=>{
    try{
            
    }
    catch(err){
        console.log(err)
        res.status(400).json({msg: err.message, ok: false}) 
    }
}

const getCartItems = async (req, res)=>{
    try{

    }
    catch(err){
        console.log(err)
        res.status(400).json({msg: err.message, ok: false}) 
    }
}

export {
    addToCart,
    removeFromCart,
    getCartItems
}
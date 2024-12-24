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
        
        let updatedUser = await UserModel.findByIdAndUpdate(user._id,{cartItem}, {returnDocument: "after"})
        res.status(200).json({msg:"cart item added",ok:true, data: updatedUser })
    }
    catch(err){
        res.status(400).json({msg: err.message, ok: false}) 
    }
}

const removeFromCart = async (req, res)=>{
    try{
            let user = req.user

            let cartItem = await user.cartItem
            
            if(cartItem[req.body.itemid]>0){
                cartItem[req.body.itemid] -= 1
                if(cartItem[req.body.itemid]===0){
                    delete cartItem[req.body.itemid]
                }
            }
            else{
                throw new Error("cant be removed already attained minimum count")
            }

            let updatedUser = await UserModel.findByIdAndUpdate(user._id, {cartItem}, {returnDocument: "after"})
            res.status(200).json({msg:"item from cart has been removed", ok:true, data: updatedUser})

    } 
    catch(err){
        res.status(400).json({msg: err.message, ok: false}) 
    }
}

const getCartItems = async (req, res)=>{
    try{
            let user = req.user

            if(!user.cartItem){
                throw new Error("no cart items")
            }

            let cartItem = await user.cartItem
            res.status(200).json({msg:"item from cart has been removed", ok:true, data:cartItem})
    }
    catch(err){
        res.status(400).json({msg: err.message, ok: false}) 
    }
}


const searchFood = async (req, res)=>{
    try{
        let {search} = req.query

        let page = req.query.page || 1
        let limit = req.query.limit || 10
        let skip = (page-1) * limit
    
    //     let totalDocuments = await FoodModel.countDocuments();

    //     let totalPages = Math.ceil(totalDocuments / limit);

    //     if (page > totalPages) {
    //         throw new Error(`Not enough data available. Total pages: ${totalPages}`);
    //     }

    //     let regex = new RegExp(search, "i")

    
    let regex = new RegExp(search, "i");
    
    // Count documents based on the search query
    let totalDocuments = await FoodModel.countDocuments({ name: { $regex: regex } });
    let totalPages = Math.ceil(totalDocuments / limit);
    
    if (page > totalPages && totalPages > 0) {
        throw new Error(`Not enough data available. Total pages: ${totalPages}`);
    }
       let searchedFoods = await FoodModel.find({name: {$regex: regex}}).skip(skip).limit(limit)

       if(!searchedFoods.length){
        throw new Error("No Food Available")
    }

       res.status(200).json({msg:"food fetched successfully",ok:true, data:searchedFoods})
    }
    catch(err){
        res.status(400).json({msg: err.message, ok: false}) 
    }
}

const getIndiCartItems = async (req, res)=>{
    try{
        let user = req.user

        let isAvailable = await UserModel.findById(user._id)
       
        if(!isAvailable){
            throw new Error("No user found")
        }

        res.status(200).json({msg:"cart items fetched successfully", ok: true, data : isAvailable.cartItem})
    }
    catch(err){
        res.status(400).json({msg: err.message, ok: false}) 
    }
}

export {
    addToCart,
    removeFromCart,
    getCartItems,
    searchFood,
    getIndiCartItems
}
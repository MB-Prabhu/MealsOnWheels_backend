import UserModel from "../models/usermodel";

const addToCart = async (req, res)=>{
    try{

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
import FoodModel from "../models/foodmodels.js";
import fs from "fs"
import orderModel from "../models/ordermodel.js";
import adminValidator from "../utils/adminValidator.js";
import  jwt  from 'jsonwebtoken';

const foodCreate =  async (req, res)=>{
    try{
        let {name, price, description, category} = req.body

        if(!name || !description || !category){
            throw new Error("Must Fill all the fields")
        }

        if (!req.file) {
             throw new Error("Image file is Required")
          }

        let imageFileName = `${req.file.filename}`
        
        let createFood = await FoodModel.create({
            name, 
            price,
            description, 
            category,
            image: imageFileName
        })
        res.status(201).json({msg: "created successfully", ok: true, data: createFood})
    }
    catch(err){
        res.status(400).json({msg: err.message, ok: false})
    }
}

const listFood = async (req,res)=>{
    try{

        let page = req.query.page || 1
        let limit = req.query.limit || 10
        let skip = (page-1) * limit
        let totalDocuments = await FoodModel.countDocuments();
            
        let totalPages = Math.ceil(totalDocuments / limit);
        if (page > totalPages) {
            throw new Error(`Not enough data available. Total pages: ${totalPages}`);
        }

        const foods = await FoodModel.find({}).skip(skip).limit(limit)
       
        if(!foods.length){
            throw new Error("No Food items are there to display")
        }

        res.status(200).json({msg: "Food items listed successfully", ok: true, data: foods})
        
    }
    catch(err){
        res.status(400).json({msg: err.message, ok: false}) 
    }
}


const categoryFood = async (req, res)=>{
    try{

        let page = req.query.page || 1
        let limit = req.query.limit || 10
        let skip = (page-1) * limit
        let category = req.query.category
        let regex = new RegExp(category, "i");
    
        let totalDocuments = await FoodModel.countDocuments({ category: { $regex: regex } });
        let totalPages = Math.ceil(totalDocuments / limit);
        
        if (page > totalPages && totalPages > 0) {
            throw new Error(`Not enough data available. Total pages: ${totalPages}`);
        }
           let categorizedFoods = await FoodModel.find({category: {$regex: regex}}).skip(skip).limit(limit)
    
           if(!categorizedFoods.length){
            throw new Error("No Food Available")
        }
    
           res.status(200).json({msg:"food fetched successfully",ok:true, data:categorizedFoods})
            
    }
    catch(err){
        res.status(400).json({msg: err.message, ok: false}) 
    }
}

const removeFoodItems = async(req, res)=>{
    try{
        const {id} = req.params

        let isExists = await FoodModel.findById(id)

        if(!isExists){
            throw new Error("item not available")
        } 

        fs.unlink(`uploads/${isExists.image}`, ()=>{
            //     if(err) throw Error("error while removing the image"+ err)
        })

        const deletedItem = await FoodModel.findByIdAndDelete(id)

        res.status(200).json({msg: "Food item deleted successfully", ok: true, data: deletedItem})

    }
    catch(err){
        res.status(400).json({msg: err.message, ok: false}) 
    }
}
const listOrders = async (req, res)=>{
    try{
        let page = req.query.page || 1
        let limit = req.query.limit || 10
        let skip = (page-1) * limit
    
        let totalDocuments = await orderModel.countDocuments();

        let totalPages = Math.ceil(totalDocuments / limit);

        if (page > totalPages) {
            throw new Error(`Not enough data available. Total pages: ${totalPages}`);
        }

        const data = await orderModel.find().skip(skip).limit(limit)

        res.status(200).json({msg:"orders fetched successfully",ok: true, data})
    }
    catch(err){
        res.status(400).json({msg: err.message, ok: false}) 
    }
}

const updateOrders = async(req, res)=>{
    try{
        let {_id, foodStatus} = req.body

       let data = await orderModel.findByIdAndUpdate(_id, {status: foodStatus}, {returnDocument: "after"})
       res.status(200).json({msg:"status updated successfully", ok: true, data})
    }
    catch(err){
        res.status(400).json({msg: err.message, ok: false}) 
    }
}

const adminLogin = async (req, res)=>{
    try{
        const {email, password} = req.body
        await adminValidator(req)

        let isCorrectPassword = password===process.env.ADMIN_PASSWORD
        let isCorrectEmail = password===process.env.ADMIN_EMAIL

       if(!isCorrectPassword && !isCorrectEmail){
                   throw new Error("Invalid credentials")
               }
               
               // let token = await jwt.sign({_id: isExists._id},process.env.JWT_SECREAT_KEY, {expiresIn: process.env.JWT_TOKEN_EXPIRY} )
               let token = await jwt.sign({email: email},process.env.JWT_SECREAT_KEY )
               res.status(200).json({msg:"login successfull", ok:true, token})
           

    }
    catch(err){
        res.status(400).json({msg: err.message, ok: false}) 
    }
}
export {
    foodCreate, 
    listFood,
    categoryFood,
    removeFoodItems,
    listOrders,
    updateOrders,
    adminLogin
}
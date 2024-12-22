import FoodModel from "../models/foodmodels.js";
import fs from "fs"
import orderModel from "../models/ordermodel.js";

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
        console.log(err.message)
        res.status(400).json({msg: err.message, ok: false})
    }
}

const listFood = async (req,res)=>{
    try{
        const foods = await FoodModel.find({})
        console.log(foods)
        if(!foods.length){
            throw new Error("No Food items are there to display")
        }

        res.status(200).json({msg: "Food items listed successfully", ok: true, data: foods})
        
    }
    catch(err){
        console.log(err)
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
            // console.log(err)
            //     if(err) throw Error("error while removing the image"+ err)
            //     console.log("image delted succesffuly")
        })

        const deletedItem = await FoodModel.findByIdAndDelete(id)

        res.status(200).json({msg: "Food item deleted successfully", ok: true, data: deletedItem})

    }
    catch(err){
        console.log(err)
        res.status(400).json({msg: err.message, ok: false}) 
    }
}
const listOrders = async (req, res)=>{
    try{
        const data = await orderModel.find();

        res.status(200).json({msg:"orders fetched successfully",ok: true, data})
    }
    catch(err){
        console.log(err)
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
        console.log(err)
        res.status(400).json({msg: err.message, ok: false}) 
    }
}
export {
    foodCreate, 
    listFood,
    removeFoodItems,
    listOrders,
    updateOrders
}
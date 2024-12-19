import FoodModel from "../models/foodmodels.js";
import fs from "fs"

const foodCreate =  async (req, res)=>{
    try{
        let {name, price, description, category} = req.body
        console.log("im runnning")
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
        console.log(err)
        res.status(400).json({msg: "food not created", ok: false})

    }
}

const listFood = async (req,res)=>{
    try{
        const foods = await FoodModel.find()

        if(!foods.length){
            throw new Error("No Food items are there to display")
        }

        res.status(200).json({msg: "Food items listed successfully", ok: true, data: foods})
        
    }
    catch(err){
        console.log(err)
        res.status(400).json({msg: "food not created", ok: false}) 
    }
}


const removeFoodItems = async(req, res)=>{
    try{
        const {id} = req.params

        let isExists = await FoodModel.findById(id)

        if(!isExists){
            throw new Error("item not available")
        } 

        fs.unlink(`uploads/${isExists.image}`, (err, res)=>{
                if(err) throw new Error("error while removing the image", err)
                console.log("image delted succesffuly")
        })

        const deletedItem = await FoodModel.findByIdAndDelete(id)

        res.status(200).json({msg: "Food item listed successfully", ok: true, data: deletedItem})

    }
    catch(err){
        console.log(err)
        res.status(400).json({msg: "food not created", ok: false}) 
    }
}
  
export {
    foodCreate, 
    listFood,
    removeFoodItems
}
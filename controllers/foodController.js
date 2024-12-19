import FoodModel from "../models/foodmodels.js";
import fs from "fs"
const foodCreate =  async (req, res)=>{
    try{
        let {name, price, description, category} = req.body

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

        res.status(201).json({msg: "created successfully", ok: true, data: createFood})
        
    }
    catch(err){
        console.log(err)
        res.status(400).json({msg: "food not created", ok: false}) 
    }
}
  
export {
    foodCreate, 
    listFood
}
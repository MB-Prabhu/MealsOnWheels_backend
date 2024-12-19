import FoodModels from "../models/foodmodels.js";

const foodCreate =  async (req, res)=>{
    try{
        console.log("he;lp")
        let {name, price} = req.body
        console.log("hello")
        let creaeFood = await FoodModels.create({name, price})
        res.status(201).json({msg: "created successfully", ok: true, data: creaeFood})
    }
    catch(err){
        console.log(err)
        res.status(400).json({msg: "food not created", ok: false})

    }
}
  
export {foodCreate}
import mongoose from "mongoose";

let FoodSchema = mongoose.Schema({
    name: {
        type: String,
    },
    descritpion: {
        type: String
    },
    price:{
        type: Number,
    },
    image:{
        type: String
    },
    category:{
        type: String
    }

},{
    timestamps: true
})

const FoodModels =mongoose.model.FoodSchema || mongoose.model("FoodSchema", FoodSchema)

export default FoodModels;
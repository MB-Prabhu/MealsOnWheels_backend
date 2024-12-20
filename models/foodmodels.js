import mongoose from "mongoose";

let FoodSchema = mongoose.Schema({
    Name: {
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

const FoodModel =mongoose.model.FoodSchema || mongoose.model("FoodSchema", FoodSchema)

export default FoodModel;
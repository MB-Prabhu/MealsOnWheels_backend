import mongoose from "mongoose";

let FoodSchema = mongoose.Schema({
    name: {
        type: String,
    },
    description: {
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

FoodSchema.indexes({name: 1})

const FoodModel =mongoose.models.FoodSchema || mongoose.model("FoodSchema", FoodSchema)

export default FoodModel;
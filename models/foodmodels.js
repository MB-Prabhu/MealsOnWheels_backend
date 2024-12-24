import mongoose from "mongoose";

let FoodSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trime: true,
        minlength: [3, "Food name must be at least 3 characters long"]
    },
    description: {
        type: String,
        trim: true,
        maxLength: [300, "Description cannot exceed 300 characers"]
    },
    price:{
        type: Number,
        required: true,
        min: [0, "price cannot be negative"]
    },
    image:{
        type: String,
        required: true
    },
    category:{
        type: String,
        enum: {
            values: ["Pure Veg", "Salad", "Rolls", "Sandwich", "desserts", "Pasta", "Cake", "Noodles"],
            message: "category must be Pure Veg, Salad, Rolls, Sandwich, desserts, Pasta, Cake, Noodles"
        }
    }

}, {
    timestamps: true
})

FoodSchema.indexes({name: 1})

const FoodModel =mongoose.models.FoodSchema || mongoose.model("FoodSchema", FoodSchema)

export default FoodModel;
import mongoose, { now } from "mongoose";

const orderSchema = mongoose.Schema({
    userId: {
        type: String
    },
    items: {
        type: Array,
        required: true,
    },
    amount: {
        type: Number, 
        required: true,
        min: [0, "amount cannot be negative"]
    },
    address: {
        type: Object,
        required: true,
    },
    status: {
        type: String,
        default: "Food processing",
        required: true,
        trim: true,
        enum: {
            values: ["Food processing", "Out For delivery", "Delivered"],
            message: "status can be either Food processing or Out For delivery or Delivered"
        }
    },
    date: {
        type: Date,
        default: Date.now()
    },
    payment: {
        type: Boolean,
        default: false,
        required: true
    },
})

const orderModel = mongoose.models.Ordermodel = mongoose.model("OrderModel", orderSchema)

export default orderModel;
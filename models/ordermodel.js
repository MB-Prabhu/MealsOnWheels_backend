import mongoose, { now } from "mongoose";

const orderSchema = mongoose.Schema({
    userId: {
        type: String
    },
    items: {
        type: Array
    },
    amount: {
        type: Number
    },
    address: {
        type: Object
    },
    status: {
        type: String,
        default: "Food processing"
    },
    date: {
        type: Date,
        default: Date.now()
    },
    payment: {
        type: Boolean,
        default: false
    },
})

const orderModel = mongoose.models.Ordermodel = mongoose.model("OrderModel", orderSchema)

export default orderModel;
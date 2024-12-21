import mongoose from "mongoose";

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
        type: String
    },
    date: {
        type: Date
    },
    payment: {
        type: Boolean
    },
})

const orderModel = mongoose.models.Ordermodel = mongoose.model("OrderModel", orderSchema)

export default orderModel;
import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import connectDB from "./config/connectDB.js"
import foodRouter from "./routes/foodroutes.js"
import userRouter from "./routes/userrouter.js"
import cartRouter from "./routes/cartroutes.js"
import orderRouter from "./routes/orderroutes.js"

dotenv.config()

const app = express()
 
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173"
    // origin: "http://localhost:5173"
}))  

app.use(express.json())
app.use('/api', foodRouter)
app.use("/images", express.static('uploads'))
app.use("/user", userRouter)
app.use("/user/cart", cartRouter)
app.use("/user/order", orderRouter)


let PORT = process.env.PORT || 4000 

connectDB().then(()=>{
    app.listen(PORT, ()=>{
        console.log(`listening at port http://localhost:${PORT}`)
    })
})
.catch(err=> {
    console.log("error ocurred", err.message)
}
)
import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import connectDB from "./config/connectDB.js"
import foodRouter from "./routes/foodroutes.js"
import userRouter from "./routes/userrouter.js"

dotenv.config()
const app = express()
 
app.use(cors({
    origin: "*"
}))  
app.use(express.json())

app.use('/api', foodRouter)
app.use("/images", express.static('uploads'))
app.use("/user", userRouter)

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
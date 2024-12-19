// const express = require("express")
// const dotenv = require("dotenv")
import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import connectDB from "./config/connectDB.js"
import foodRouter from "./routes/foodroutes.js"

dotenv.config()
const app = express()
 
app.use(cors({
    origin: "*"
}))  
app.use(express.json())

// app.get("/", (req, res)=>{
//     res.send("hello")
// })

app.use('/', foodRouter)
  
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
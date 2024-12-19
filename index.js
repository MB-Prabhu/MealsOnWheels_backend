// const express = require("express")
// const dotenv = require("dotenv")
import express from "express"
import dotenv from "dotenv"
import cors from "cors"

dotenv.config()
const app = express()

app.use(cors({
    origin: "*"
}))
app.use(express.json())

 
let PORT = process.env.PORT
app.listen(PORT, ()=>{
    console.log(`listening at port http://localhost:${PORT}`)
})
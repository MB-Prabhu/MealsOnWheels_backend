const express = require("express")
const dotenv = require("dotenv")
dotenv.config()
const app = express()


let PORT = process.env.PORT
console.log(PORT)
app.listen(PORT, ()=>{
    console.log(`listening at port ${PORT}`)
})
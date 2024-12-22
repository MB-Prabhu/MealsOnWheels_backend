import jwt from "jsonwebtoken"
import UserModel from "../models/usermodel.js"

const authMiddleware = async (req, res, next)=>{
    try{
        console.log(req.headers)
        let {token} = req.headers

        // console.log(token, isToken)
        if(!token){
            throw new Error("Not authorized, Please login")
        }
 
            let {_id} = jwt.verify(token ,process.env.JWT_SECREAT_KEY)
            let user = await UserModel.findById(_id)
            if(!user){
                throw new Error("user not available")
            }
            req.user = user
            next()
    }
        catch(err){
        res.status(400).json({msg: err.message, ok: false}) 
        }
}

export {authMiddleware};
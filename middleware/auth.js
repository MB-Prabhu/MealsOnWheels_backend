import jwt from "jsonwebtoken"
import UserModel from "../models/usermodel.js"

const authMiddleware = async (req, res, next)=>{
    try{
        let {token} = req.headers

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

const adminAuthMiddleware = async(req, res, next)=>{
    try{
        let {token} = req.headers

        if(!token){
            throw new Error("Not authorized, Please login")
        }

        let {email} = jwt.verify(token ,process.env.JWT_SECREAT_KEY)
        
        let isCorrectEmail = email===process.env.ADMIN_EMAIL

        if(!isCorrectEmail){
            throw new Error("provided email is not admin email")
        }

        next()

    }
    catch(err){
        res.status(400).json({msg: err.message, ok: false}) 
    }
}

export {authMiddleware, 
    adminAuthMiddleware
};
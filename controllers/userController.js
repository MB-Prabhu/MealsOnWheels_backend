import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";

import UserModel from '../models/usermodel.js';
import { userLoginValidator, userRegisterValidator } from '../utils/userValidator.js';

const registerUser = async (req,res)=>{
    try{
        const {Name, email, mobile, password, confirmPassword, address} = req.body
        await userRegisterValidator(req)

        const hashedPassword = await bcrypt.hash(password, 10)

        console.log(hashedPassword)
        let user = await UserModel.create({
            Name, 
            email, 
            mobile, 
            password: hashedPassword, 
            confirmPassword: hashedPassword,
            address
        })
        
        res.status(201).json({  ok: true, msg:"User Successfully Registered", data: user})
    }
    catch(err){
        console.log(err)
        res.status(400).json({msg: err.message, ok: false}) 
    }
}

const loginUser = async (req,res)=>{
    try{
        await userLoginValidator(req)

        let isExists = await UserModel.findOne({email: email})
            
        if(!isExists){
            throw new Error("User doesn't exists")
        }

        let isMatching = await bcrypt.compare(password, isExists.password)

        if(!isMatching){
            throw new Error("Invalid credentials")
        }

        let token = await jwt.sign({_id: isExists._id},process.env.JWT_SECREAT_KEY, process.env.JWT_TOKEN_EXPIRY )
    }
    catch(err){
        console.log(err)
        res.status(400).json({msg: err.message, ok: false}) 
    }
}

export {
    registerUser,
    loginUser
}
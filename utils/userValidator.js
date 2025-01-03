import validator from "validator"
import UserModel from "../models/usermodel.js"


const userRegisterValidator = async (req)=>{
        const {Name, email, mobile, password, confirmPassword, address} = req.body

        if(!Name || !email || !mobile || !password || !confirmPassword){
            throw new Error("All fields must be filled")
        }

        let isExists = await UserModel.findOne({$or: [{email:email}, {mobile: mobile}]})


        if(isExists){
            throw new Error("User Already exists")
        }

        if(!validator.isEmail(email)){
            throw new Error("Email is not in valid format")
        }

        if(!validator.isMobilePhone(mobile)){
            throw new Error("Enter correct Mobile Format")
        }

        if (mobile.length !== 10) {
            throw new Error("Mobile number must be exactly 10 digits");
        }

        if(!validator.isStrongPassword(password)){
            throw new Error("Enter a strong Password")
        }

        if(password !== confirmPassword){
            throw new Error("Password and Confirm Password doesn't match")
        }
}

const userLoginValidator = async (req)=>{
    const {email, password} = req.body
    
    if(!email || !password){
        throw new Error("All fields must be filled")
    }

    if(!validator.isEmail(email)){
        throw new Error("Email is not in valid format")
    }

}

export {
    userRegisterValidator,
    userLoginValidator
}
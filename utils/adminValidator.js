const adminValidator = (req)=>{
   const {email, password} = req.body

   if(!email || !password ){
    throw new Error("All fields must be filled")
    }

    if(!email.includes("@")){
        throw new Error("Email is not in valid format")
    }

    if(password.length<8){
        throw new Error("Enter a strong Password")
    }
}

export default adminValidator;
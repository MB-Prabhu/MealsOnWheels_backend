import mongoose  from 'mongoose';

const UserSchema = mongoose.Schema({
    Name: {
        type: String
    },
    mobile:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    confirmPassword:{
        type: String,
        required: true
    },
    cartItem:{
        type: Object,
        default: {}
    }
}, {
    minimize: false
})

UserSchema.indexes({email: 1})

const UserModel = mongoose.models.userModel || mongoose.model("userModel", UserSchema)

export default UserModel;
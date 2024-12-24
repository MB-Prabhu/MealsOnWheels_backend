import mongoose  from 'mongoose';

const UserSchema = mongoose.Schema({
    Name: {
        type: String,
        required: true,
        trim: true,
    },
    mobile:{
        type: String,
        required: true,
        minLength: [10, "mobile number should 10 digits long"]
    },
    email:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true,
        trim: true,
        maxLength: [350, "address should not exceed more than 350 characters"]
    },
    password:{
        type: String,
        required: true,
        minLength: [8, "password must be atleast 8 characters long"],

    },
    confirmPassword:{
        type: String,
        required: true,
        minLength: [8, "password must be atleast 8 characters long"],

    },
    cartItem:{
        type: Object,
        default: {}
    }
}, {
    minimize: false
})

UserSchema.indexes({email: 1})

UserSchema.pre('save', function(next) {
    if (this.password !== this.confirmPassword) {
        throw new Error("Password and Confirm Password must match");
    }
    next();
});

const UserModel = mongoose.models.userModel || mongoose.model("userModel", UserSchema)

export default UserModel;
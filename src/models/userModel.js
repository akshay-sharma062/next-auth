
import mongoose from 'mongoose';

const userSchema= new mongoose.Schema({
    username:{
        type:String,
        required:[true,'please provide a username'],
        unique:true
    },
    email:{
        type:String,
        required:[true,'please provide a email'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'please provide a password']
        
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    isadmin:{
        type:Boolean,
        default:false
    },
    forgotPasswordTokens:String,
    forgotPasswordTokensExpiry:Date,
    verifyToken:String,
    verifyTokenExpiry:Date
})

const User = mongoose.models.users || mongoose.model("users",userSchema)


export default User;
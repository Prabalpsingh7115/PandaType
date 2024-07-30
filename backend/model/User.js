import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    refreshToken:String,
    joindate:{
        type:String
    },
    tests:{
        tstart:{
            type:Number    
        },
        tfinish:{
            type:Number    
        },
        ttime:{
            type:Number
        },
    }

})

export default mongoose.model('User',UserSchema);
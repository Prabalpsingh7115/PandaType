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
    },
    records:{
        modeTime:{
            fifteen:{
                type:Number,
                default:200
            },
            thirty:{
                type:Number,
                default:200
            },
            sixty:{
                type:Number,
                default:200
            },
            onetwenty:{
                type:Number,
                default:200
            }
        },
        modeWords:{
            twenty:{
                type:Number,
                default:200
            },
            fifty:{
                type:Number,
                default:200
            },
            seventy:{
                type:Number,
                default:200
            },
            hundred:{
                type:Number,
                default:200
            }

        }
    }

})

export default mongoose.model('User',UserSchema);
import mongoose from "mongoose";

const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.DATABASE_URI,{
            dbName:"PandaType",
        })
        console.log("Database Connected Succesfully");
    }catch(err){
        console.log(err);
    }
}

export default connectDB;
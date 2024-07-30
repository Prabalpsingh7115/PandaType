import User from "../model/User.js";

const getProfile=async(req,res)=>{
    
    const {username}=req.query;
    const foundUser = await User.findOne({username}).exec();

    return res.status(201).json({...foundUser._doc,'message':'user-details'})
}

export default getProfile;
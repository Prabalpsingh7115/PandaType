import User from "../model/User.js";

const getProfile=async(req,res)=>{
    
    
    const {username}=req.query;
    // console.log(username)
    if(!username)
    {
        return res.status(403).json({'message':'No Username found'})
    }
    
    const foundUser = await User.findOne({username}).exec();
    
    if(!foundUser)
    {
            
        return res.status(404).json({'message':'No User found'})
    }


    return res.status(201).json({...foundUser._doc,'message':'user-details'})
}

export default getProfile;
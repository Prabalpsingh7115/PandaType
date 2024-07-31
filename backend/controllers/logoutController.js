

import User from "../model/User.js";

const handleLogout = async (req,res)=>{

    //delete the accesstoken (frontend)

    const cookies=req.cookies;
    if(!cookies?.jwt)
    {
        return res.status(201).json({'message':'behenchod'});
    }
    
    const refreshToken=cookies.jwt;
    const foundUser = await User.findOne({refreshToken}).exec();
    
    if(!foundUser)
    {
        res.clearCookie('jwt',{httpOnly:true,secure:true});
        return res.status(204).json({'message':'behenchod'});
    }

    foundUser.refreshToken=undefined;
    await foundUser.save();

    res.clearCookie('jwt',{httpOnly:true,secure:true});
    return res.status(204).json({'message':`${foundUser.username} logged out successfully`})
}

export default handleLogout;
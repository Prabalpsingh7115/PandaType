import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config'

import User from '../model/User.js';

const handleLogin =async (req,res)=>{

    const {username,password}=req.body;

    if(!username)
    {
        return res.status(400).json({'message':'Username is required!'});
    }

    if(!password)
    {
        return res.status(400).json({'message':'Password is required!'});
    }

    const foundUser = await User.findOne({username}).exec();

    if(!foundUser)
    {
        return res.status(403).json({'message':'No User found!'})
    }

    const match=await bcrypt.compare(password,foundUser.password);
    if(!match)
    {
        return res.status(401).json({'message':'Incorrect Password'})
    }

    const accessToken=jwt.sign(
        {username:username},
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:'60s'}
    )

    const refreshToken=jwt.sign(
        {username:username},
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn:'10m'}
    )

    foundUser.refreshToken=refreshToken;
    await foundUser.save();

    res.cookie('jwt',refreshToken,{httpOnly:true,maxAge:10*60*1000});
    return res.status(200).json({accessToken});
}

export default handleLogin;
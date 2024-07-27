import 'dotenv/config'
import jwt from 'jsonwebtoken'

import User from '../model/User.js'

const handleRefreshToken = async (req,res)=>{

    const cookies=req.cookies;
    if(!cookies?.jwt)
    {
        return res.status(401).json({'message':'No Cookies found!'})
    }

    const refreshToken = cookies.jwt;
    const foundUser=await User.findOne({refreshToken}).exec();

    if(!foundUser)
    {
        return res.status(401).json({'message':'User not found'});
    }

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err,decoded)=>{
            if(err||decoded.username!==foundUser.username)
            {
                return res.status(403)
            }

            const accessToken=jwt.sign(
                {username:foundUser.username},
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn:'30s'}
            )

            return res.status(200).json({accessToken});
        }

    )
}

export default handleRefreshToken;
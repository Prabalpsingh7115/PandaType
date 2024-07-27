import jwt from 'jsonwebtoken';
import 'dotenv/config';

const verifyJWT = (req,res,next) => {

    const authHeader = req.headers['authorization'];
    if(!authHeader)
    {
        return res.status(401).json({'message':'Headers not found!'})
    }

    const token=authHeader.split(' ')[1];
    if(!token)
    {
        return res.status(401).json({'message':'Token not found!'})
    }

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err,decoded)=>{
            if(err)
            {
                return res.status(403).json({'message':err})
            }

            req.username=decoded.username
            next()
            return res.status(200)
        }
    )
}

export default verifyJWT;
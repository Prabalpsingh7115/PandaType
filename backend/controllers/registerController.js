import User from '../model/User.js'
import bcrypt from 'bcrypt'

const handleNewUser =async (req,res)=>{
    const {username,email,password}=req.body

    if(!username)
    {
        return res.status(400).json({'message':'Username is required'});
    }
    if(!email)
    {
        return res.status(400).json({'message':'Email is required'});
    }
    if(!password)
    {
        return res.status(400).json({'message':'Password is required'});
    }

    const alreadyRegistered = await User.findOne({username}).exec();
    if(alreadyRegistered)
    {
        return res.status(409).json({'message':'User already registered'})
    }



    try{
        const hashedPwd = await bcrypt.hash(password,10);

        const newUser={
            "username":username,
            "email":email,
            "password":hashedPwd
        }

        const result= await User.create(newUser);

        res.status(201).json({'message':`${username} registered successfully ! `})
    }catch(err){
        res.status(500).json({'message':err.message});

    }

}

export default handleNewUser;
import express from "express";
import { createServer } from 'node:http';
import 'dotenv/config';
import cookieParser from "cookie-parser";
import cors from 'cors'

import connectDB from './functions/connectDB.js'
import handleNewUser from "./controllers/registerController.js";
import handleLogin from "./controllers/authController.js";
import verifyJWT from "./functions/verifyJWT.js";
import handleRefreshToken from "./controllers/refreshTokenController.js";
import handleLogout from "./controllers/logoutController.js";
import getProfile from "./controllers/profileController.js";


const app=express();
const server=createServer(app)
connectDB();


const corsOptions = {
    origin: ['http://localhost:5173','https://panda-type.netlify.app'],
    optionsSuccessStatus: 200,
    credentials:true
};
 
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());


app.post('/register',(req,res)=>{
    handleNewUser(req,res);
})

app.post('/auth',(req,res)=>{
    handleLogin(req,res);
})

app.post('/refresh',(req,res)=>{
    handleRefreshToken(req,res);
})

app.get('/profile',verifyJWT,(req,res)=>{
    getProfile(req,res);
})


app.post('/logout',(req,res)=>{
    handleLogout(req,res);
})

app.get('/',(req,res)=>{
    res.send("<h1>HELLO</h1>")
})

server.listen(4000,()=>{
    console.log("Server is running")
})
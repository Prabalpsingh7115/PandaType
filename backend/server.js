import express from "express";
import { createServer } from 'node:http';
import { Server } from "socket.io";
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


const corsOptions = {
    origin: ['http://localhost:5173','https://panda-type.netlify.app'],
    optionsSuccessStatus: 200,
    credentials:true
};


const app=express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
const server = createServer(app)

const io = new Server(server, {
    cors: {
        origin: ['http://localhost:5173', 'https://panda-type.netlify.app'],
        methods: ["GET", "POST"],
        credentials: true
    }
});

io.on('connection',(socket)=>{

    socket.on('connect',()=>{
        console.log('User Connected:', socket.id)
    })

    socket.on('create',()=>{
        let roomID=Math.random().toString(36).slice(2)
        console.log('Room Created',roomID,"by",socket.id)
        socket.join(roomID);
        console.log(roomID,'joined by ',socket.id)

        socket.emit('roomId',roomID)
    })
    
    socket.on('join-room',(roomID)=>{
        socket.join(roomID)
        console.log(roomID,'joined by ',socket.id)
    })

    socket.on('send-message',(msg,roomID)=>{
        console.log(msg);
        socket.to(roomID).emit('message',msg)
    })

   
     

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
})



connectDB();

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
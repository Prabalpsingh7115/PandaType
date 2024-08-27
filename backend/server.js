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
import getPara from "./controllers/paraController.js";
import GetParagraph from "./functions/getParagraph.js";


const corsOptions = {
    origin: [ 'http://localhost:5173', 'https://pandatype.co' ],
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
        origin: ['http://localhost:5173','https://pandatype.co'],
        methods: ["GET", "POST"],
        credentials: true
    }
});

io.on('connection',(socket)=>{

    console.log(`User connected ${socket.id}`);

    socket.on('connect',()=>{
        console.log('User Connected:', socket.id)
    })

    socket.on('create-room',(cb)=>{
        let roomID=Math.random().toString(10).slice(12)
        socket.join(roomID);
        console.log('Room ',roomID,"created & joined by",socket.id)
        cb(roomID)
    })
    
    socket.on('join-room',(roomID,cb)=>{
        socket.join(roomID)
        console.log(roomID,'joined by ',socket.id)
        cb(roomID)
    })

    socket.on('player-joined',(mode,submode,roomID)=>{
        const curPara=GetParagraph(mode,submode);
        // console.log(curPara)
        socket.to(roomID).emit('player-joined',roomID)
        io.to(roomID).emit('ready','Get Ready',curPara);
    })

    socket.on('cursor-pos',(roomID,game,wIdx,lIdx)=>{
        // console.log(wIdx,lIdx,game)
        socket.to(roomID).emit('opponent-cursor',wIdx,lIdx)
    })

    socket.on('start',(roomID)=>{
        io.to(roomID).emit('start');
    })

    socket.on('rematch-request',(roomID,cb)=>{

        socket.to(roomID).emit('rematch-request',roomID)
        cb()
    })
    
    socket.on('rematch-response',(roomID,res)=>{
        socket.to(roomID).emit('rematch-success',res);
    })

    

    socket.on('result',(roomID,result)=>{
        socket.to(roomID).emit('opponent-result',result)
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

app.get('/para',(req,res)=>{
    getPara(req,res);
})

server.listen(4000,()=>{
    console.log("Server is running")
})
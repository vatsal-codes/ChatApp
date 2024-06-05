import {Server} from "socket.io";
import http from "http";
import express from "express";

const app= express();

const server =http.createServer(app);
const io=new Server(server,{

    cors: {
        origin: "http://localhost:3001",
        methods: ["GET","POST"],

    }
})

export const getReceiverSocketId=(receiverId)=>{
    return users[receiverId];
}

const users={}

io.on("connection",(socket)=>{
    console.log("A User Connected: ",socket.id);
    const userId=socket.handshake.query.userId;
    if(userId){
        users[userId]=socket.id
        console.log("Hello",users)
    }

    io.emit("getOnlineUsers", Object.keys(users));

    socket.on("disconnect",()=> {
        console.log("A User Disconnected: ",socket.id);
        delete users[userId];
        io.emit("getOnlineUsers", Object.keys(users));

    })
})


export {app,io,server}
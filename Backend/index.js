import express from 'express'
import dotenv from "dotenv"
import mongoose from "mongoose";
import userRoute from "./route/user.route.js";
import messageRoute from "./route/message.route.js";
import {app, server} from "./SocketIO/server.js"
import path from "path";

import cors from "cors";
import cookieParser from "cookie-parser";


dotenv.config();


app.use(express.json());
app.use(cookieParser());
app.use(cors());

const PORT = process.env.PORT || 3001;
const URI=process.env.MONGODB_URI;

try {
    mongoose.connect(URI)
        console.log("Connected to MongoDB");
} catch (error) {
    console.log(error)
}

 app.use("/api/user", userRoute)
 app.use("/api/message", messageRoute)

if(process.env.NODE_ENV ==="production") {
    const dirPath = path.resolve();
    app.use(express.static("./Frontend/dist"));
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(dirPath,"./Frontend/dist","index.html"));
    })
}


server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});


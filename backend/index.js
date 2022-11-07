require('./db');
const express=require('express');
const cors=require('cors');
const userRoutes=require('./Routes/userRoutes');
const messagesRoutes=require('./Routes/messagesRoute');
const env=require('dotenv');
const app=express();
const socket=require('socket.io');
env.config();
app.use(cors());   
app.use(express.json());
app.use('/api/auth',userRoutes);
app.use('/api/messages',messagesRoutes);
 
const server=app.listen(process.env.PORT,()=>{
    console.log("server started on port 5000")
});

const io=socket(server,{
    cors:{
        origin:"http://localhost:3000",
        credentials:true,
    }
});

global.onlineUsers=new Map();
io.on("connection",(socket)=>{
    global.chatSocket=socket;
    socket.on("add-user",(userId)=>{
        onlineUsers.set(userId,socket.id);
    });

    socket.on("send-msg",(data)=>{
        const sendUserSocket=onlineUsers.get(data.to);
        if(sendUserSocket){
            socket.to(sendUserSocket).emit('msg-recieve',data.message);
        }
    });
})
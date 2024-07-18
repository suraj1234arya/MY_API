const {Server}=require('socket.io');
const http=require('http');
const express=require('express');
const app=express();

const server=http.createServer(app);
const io =new Server(server,{
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    },
});

 const getRecieverSocketId=(receiverId)=>{
  return userSocketMap[receiverId];
 }
const userSocketMap={};
io.on('connection',(socket)=>{
    console.log('a user connected', socket.id);
    const userId=socket.handshake.query.userId;
    if(userId!=="undefined"){
        userSocketMap[userId]=socket.id;
        console.log(userSocketMap)
    }
    
    io.emit("getOnlineUser",Object.keys(userSocketMap));
    socket.on("send-msg", (msg) => {
        // console.log("Message sent", msg);
        // Extract receiver ID and message content from the received message object
        const receiverId = msg.receiverId;
        // console.log(receiverId,"receiverId");
        const receiverSocketId = userSocketMap[receiverId];
    
        if (receiverSocketId) {
            // Emit the message to the receiver's socket
            io.to(receiverSocketId).emit("rcv-message", msg);
        } else {
            console.log(`User with ID ${receiverId} is not connected.`);
        }
    });

    socket.on("rcv-message", (msg)=>{
        console.log("message rcved",msg)
    })


    socket.on('disconnect',()=>{
        console.log('user disconnected', socket.id);
        delete userSocketMap[userId];
        console.log(userSocketMap);
        io.emit("getOnlineUser",Object.keys(userSocketMap));
    })
   
})
module.exports ={app,io,server,getRecieverSocketId};


const msgModel=require('../models/msg.model');
const conversationModel= require('../models/conversation.model');
const {getRecieverSocketId}=require('../socket/socket');
const sendMessage =async(req,res)=>{
  try {
    const {message}=req.body;
    const {id:receiverId}=req.params;
    const senderId=req.user._id;
    let conversation=await conversationModel.findOne({
        participants:{
            $all:[senderId,receiverId]
        }
    })
    if(!conversation){
        conversation=await conversationModel.create({
            participants:[senderId,receiverId]
        });
        
    }
    const newMsg=await msgModel({
        senderId,
        receiverId,
        message
    })
    if(newMsg){
        conversation.messages.push(newMsg._id);
    }

    await Promise.all([conversation.save(),newMsg.save()]);
    // add spcketIo functionally
    const receiverSocketId=getRecieverSocketId(receiverId);
    if(receiverSocketId){
        //send ton event to specific clients
        io.to(receiverSocketId).emit('newMessage',newMsg);
    }
    res.json(newMsg);
  } catch (error) {
    res.json(error)
  }
}

const getMessages=async(req,res)=>{
    try {
        const {id:userToChatId}=req.params;
        const senderId=req.user._id;
        const conversation=await conversationModel.findOne({
            participants:{
                $all:[senderId,userToChatId]
            }
        }).populate('messages');
        if(conversation){
            res.json(conversation.messages);
        } else {
            res.status(404).json({message:"Conversation not found"})
        }
       } catch (error) {
        res.json(error);
       }
}
module.exports = {sendMessage,getMessages};
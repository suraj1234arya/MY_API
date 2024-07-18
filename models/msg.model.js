const mongoose = require('mongoose');
const MSG=mongoose.Schema({
    senderId:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    },
    receiverId:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    },
    message:{
        type:String,
    }
},
    {timestamps:true}
);

module.exports=mongoose.model('Message',MSG);
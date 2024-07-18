const mongoose = require('mongoose');
const FOLLOW=mongoose.Schema({
    userId:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    },
    organizerId:{
        type:mongoose.Types.ObjectId,
        ref:'organizer'
    }
})
module.exports=mongoose.model('follow',FOLLOW);
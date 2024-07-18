const mongoose=require('mongoose');
const HELP = mongoose.Schema({
    userId:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    },
    title:{
        type:String
    },
    desccription:{
        type:String
    },
    helpType:{
        type:String
    }
})
module.exports = mongoose.model('helps',HELP);
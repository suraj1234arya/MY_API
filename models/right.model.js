const mongoose =require('mongoose');
const RIGHT=mongoose.Schema({
    staff_Id:{
     type:mongoose.Types.ObjectId,
     ref:'Staff'
    },
    right_name:{
        type:String,
    },
    right_description:{
        type:String,
    }
})

module.exports=mongoose.model('Right',RIGHT);
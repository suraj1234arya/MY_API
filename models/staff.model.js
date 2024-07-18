const mongoose= require('mongoose');
const STAFF= mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
    },
    phone:{
        type:String,
    }
})
module.exports=mongoose.model('Staff',STAFF);
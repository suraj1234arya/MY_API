const mongoose= require('mongoose');
const ADMIN=mongoose.Schema({
    adminName:{
        type:String
    },
    adminEmail:{
        type:String
    },
    adminPhone:{
      type:Number
    },
    adminPassword:{
        type:String
    },
    token:{
        type:String
    }
},
{ timestamps: true }
)
module.exports=mongoose.model('admin',ADMIN);
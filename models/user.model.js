const mongoose= require('mongoose');
const USER=mongoose.Schema({
    GoogleId:{
    type:String
    },
    username:{
        type:String,
    },
    password:{
        type:String,
    },
    images:{
      type:[String]
    },
    email:{
        type:String,
    },
    phone:{
        type:Number
    },
    phoneOtp:{
      type:Number
    },
    emailOtp:{
      type:Number
    },
    token:{
        type:String,
    },
},
    { timestamps: true }
);

module.exports=mongoose.model('User',USER);
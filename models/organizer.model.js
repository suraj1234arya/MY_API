const mongoose= require('mongoose')
const ORGANIZER=mongoose.Schema({
    name:{
        type:String
    },
    businessEmail:{
        type:String
    },
    workType:{
        type:String
    }
})
module.exports=mongoose.model('organizer',ORGANIZER);

const mongoose=require('mongoose')
const reportSchema=mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    situation:{
        type:String,
        require:true
    }
},
{timestamps:true}
)
module.exports=mongoose.model('Report',reportSchema);
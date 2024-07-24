const mongoose=require('mongoose')
const hospitalSchema=mongoose.Schema({
    name:{
        type:String,
        require:true,
        unique:true,
    },
    hospitalAddress:{
        type:String,
        require:true
    },
    city:{
        type:String,
        require:true
    },
    pincode:{
        type:String,
        require:true
    },
    specializeIn:[
        {
            type:String
        }
    ]
},
{timestamps:true}
)
module.exports=mongoose.model('Hospital',hospitalSchema);
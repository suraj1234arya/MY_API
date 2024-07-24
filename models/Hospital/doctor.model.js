const mongoose=require('mongoose');
const hospitalSchema= mongoose.Schema({
    doctorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Hospital"
    },
    hoursInHospital:{
        type:Number,
        default:0
    }
})
const doctorSchema=mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    salary:{
        type:String,
        require:true
    },
    qualification:{
        type:String,
        require:true
    },
    experienceInYear:{
        type:Number,
        default:0
    },
    workInHospitals:{
        type:[hospitalSchema]
    }
},
{timestamps:true}
)
module.exports=mongoose.model('Doctor',doctorSchema);
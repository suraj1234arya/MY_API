const mongoose=require('mongoose')
const categorySchema=mongoose.Schema({
    username:{
        type:String,
        require:true,
    }
},
{timestamps:true}
)
module.exports=mongoose.model('Category',categorySchema);
const mongoose=require('mongoose');
const productSchema=mongoose.Schema({
    productId:{
      type: mongoose.Schema.Types.ObjectId,
     ref:"Product"
    },
    quantity:{
        type:Number
    }
})
const orderSchema=mongoose.Schema({
    orderPrice:{
        type:Number,
        require:true
    },
    customer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    oderItems:{
        type:[productSchema]
    },
    status:{
        type:String,
        enum:["PENDING","DELIVERED","CANCELLED"],
        default:"PENDING"
    }

},
{timestamps:true}
)
module.exports=mongoose.model('Order',orderSchema);
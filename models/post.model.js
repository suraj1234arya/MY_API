const mongoose=require('mongoose');
const POST = mongoose.Schema({
    postTitle:{
      type:String
    },
    postDescription:{
      type:String
    } 
})
module.exports = mongoose.model('posts',POST);
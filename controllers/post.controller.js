const postModel = require('../models/post.model');


const createPost=async(req,res)=>{
         try {
            const{postTitle,postDescription}=req.body;
            if(postDescription&& postTitle){
            const newPost = new postModel({
            postTitle,
            postDescription
            })
            await newPost.save();
            res.json(newPost);
            }
            else{
                res.json("PLease Enter All Fields");
            }
            } catch (error) {
            res.json(error);
            }
}

const findOnePost=async(req,res)=>{
   try {
      const postId=req.params.postId;
      const post =await postModel.findById(postId);
      res.json(post);
   } catch (error) {
      res.json(error)
   }
}

const ALLPosts=async(req,res)=>{
     try {
        const page= parseInt(req.query.page) || 1;
        const perPage=5;
        const totalPost=await postModel.countDocuments();
        const totalPages= Math.ceil(totalPost/perPage);
        if(page > totalPages){
            res.status(404).json({"msg":"Page Not Found"})
        }
        else{
       const posts = await postModel.find()
       .skip((page-1)*perPage)
       .limit(perPage)
       .exec();
       res.json({"msg":"success",posts,totalPages,page});
              }
     } catch (error) {

        console.log(error);
        res.json(error)
     }
}

const findPosts=async(req,res)=>{
   try {
      const post = await postModel.aggregate([
            {$match:{postDescription:"my posts"}},
            {$group:{_id:'$postTitle'}},
            {$sort:{total:1}},
      ])
      res.json(post);
   } catch (error) {
      res.json(error);
   }
}

module.exports = {createPost,ALLPosts,findOnePost,findPosts};
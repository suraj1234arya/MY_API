const express = require('express');
const {createPost,ALLPosts, findOnePost, findPosts} = require('../controllers/post.controller');
const route= express.Router();
route.post('/create',createPost);
route.get('/all',ALLPosts);
route.get('/get/:postId',findOnePost);
route.get("/get",findPosts);

module.exports=route;
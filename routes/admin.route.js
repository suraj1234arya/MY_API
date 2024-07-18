
const express = require('express');
const router = express.Router();
const { registerAdmin, adminLogin, getUsers, getPosts } = require('../controllers/admin.controller');
const adminAuth=require("../middlewares/admin.auth")
router.post('/register', registerAdmin);
router.post('/login', adminLogin);
router.get('/getUsers',adminAuth,getUsers);
router.get('/getPost',adminAuth,getPosts);
module.exports = router;


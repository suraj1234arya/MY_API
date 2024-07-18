const express = require('express');
const {sendMessage,getMessages} = require('../controllers/msg.controller');
const route = express.Router();
const auth = require('../middlewares/user.auth');
route.post('/send/:id',auth,sendMessage);
route.get('/get/:id',auth,getMessages);
module.exports = route;

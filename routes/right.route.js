const express = require('express');
const {createRight,getRight, deleteRight} = require('../controllers/right.controller');
const route =express.Router();
route.post('/create',createRight);
route.get('/get',getRight);
route.delete('/delete/:rightId',deleteRight)
module.exports = route;
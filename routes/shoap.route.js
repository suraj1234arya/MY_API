const express = require('express');
const {createWarehouse,getWereHousesUnderKM, getAll, getOne, updateWareHouse }= require('../controllers/shoap.controller');

const route=express.Router();

route.post('/create',createWarehouse);
route.get('/get',getWereHousesUnderKM);
route.get('/getAll',getAll);
route.get('/getOne/:wareId',getOne);
route.put("/update/:wareId",updateWareHouse);

module.exports=route;
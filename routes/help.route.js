const express= require('express');
const {createHelp,findUSerHelp, countHelp, deleteHelp, updateHelp} = require('../controllers/help.controller');
const route = express.Router();
const auth = require('../middlewares/user.auth')
route.post("/create",auth,createHelp);
route.get("/find/:helpId",findUSerHelp);
route.get('/count',countHelp);
route.delete('/del/:helpId',deleteHelp);
route.put('/update/:helpId',updateHelp);
module.exports=route;
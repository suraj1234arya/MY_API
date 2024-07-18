const express = require('express');
const {createStaff,findStaff} = require('../controllers/staff.controller');
const route = express.Router();
route.post('/create',createStaff);
route.get('/get/:staffId',findStaff);
module.exports = route;
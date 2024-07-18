const express = require('express');
const createOrganizer = require('../controllers/organizer.controller');
const router = express.Router();
router.post('/create',createOrganizer);
module.exports=router;
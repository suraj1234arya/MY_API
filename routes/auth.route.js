const express = require('express');
const router = express.Router();
const { googleLogin, verifyGoogle } = require('../controllers/auth.controller');

router.get('/googleLogin', googleLogin);
router.get('/verifyGoogle', verifyGoogle);

module.exports = router;

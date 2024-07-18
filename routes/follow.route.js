const express = require('express');
const {doFollow,unfollow, getOrganizerFollower} = require('../controllers/follow.controller');
const router = express.Router();

router.post('/follow',doFollow);
router.post('/unfollow',unfollow);
router.get('/organizer/:organizerId/followers',getOrganizerFollower);
module.exports=router;
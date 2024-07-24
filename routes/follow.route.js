const express = require('express');
const {doFollow,unfollow, getOrganizerFollower, getMyOrganizer} = require('../controllers/follow.controller');
const router = express.Router();

router.post('/follow',doFollow);
router.post('/unfollow',unfollow);
router.get('/organizer/:organizerId/followers',getOrganizerFollower);
router.get('/get/:userId',getMyOrganizer);

module.exports=router;
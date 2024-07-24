const Follow = require('../models/follow.model');

const doFollow=async(req,res)=>{
        try {
        const { userId, organizerId } = req.body;
        if(userId===organizerId){
            res.json({"msg":"user or organizer not have same Id"})
        }
        const follow = await Follow.findOne({ userId, organizerId });
        if (follow) {
            return res.status(400).json({ message: "You are already following this organizer" });
        }
        const newFollow = new Follow({
             userId, 
             organizerId 
        });
        await newFollow.save();
        res.status(200).json({ message: "Successfully followed the organizer" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const unfollow=async(req,res)=>{
   
    try {
        const { userId, organizerId } = req.body;
        const follow = await Follow.findOne({ userId, organizerId });
        if (!follow) {
            return res.status(400).json({ message: "You are not following this organizer" });
        }
        await Follow.deleteOne({
             userId,
             organizerId 
            });

        res.status(200).json({ message: "Successfully unfollowed the organizer" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const getOrganizerFollower = async (req, res) => {
    try {
        const organizerId = req.params.organizerId;
        const followers = await Follow.find({ organizerId }).populate('userId', 'username email phone ');
        const followerCount = followers.length;
        res.status(200).json({
            message: "These are my followers",
            followers: followers,
            followerCount:followerCount
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const getMyOrganizer=async(req,res)=>{
    try {
        const userId=req.params.userId;
        const myOrg=await Follow.find({userId}).populate('organizerId','name');
        const count = myOrg.length;
        res.json({
            "msg":"Thse are my organizer",
            myOrg:myOrg,
            count:count
        })
    } catch (error) {
        res.json(error.message);
    }

}
module.exports={doFollow,unfollow,getOrganizerFollower,getMyOrganizer};
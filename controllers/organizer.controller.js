const organizerModel = require('../models/organizer.model');
const  createOrganizer=async(req,res)=>{
        try {
            const{name,businessEmail,workType}=req.body;
            const organizer = new organizerModel({
                name,
                businessEmail,
                workType
            })
            await organizer.save();
            res.json(organizer);
        } catch (error) {
            res.json(error);
        }
}

module.exports=createOrganizer;
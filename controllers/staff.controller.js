const staffModel = require('../models/staff.model');

const createStaff=async(req,res)=>{
    try {
        const {name,email,phone}=req.body;
        const staff=new staffModel({
            name,
            email,
            phone
        });
        await staff.save();
        res.json(staff);
    } catch (error) {
        res.json(error.message);
    }
}
const findStaff=async(req,res)=>{
    try {
        const oneStaff= await staffModel.findById(req.params.staffId);
        res.json(oneStaff)
    } catch (error) {
        res.json(error)
    }
}
module.exports ={createStaff,findStaff};
const rightModel = require('../models/right.model');

const createRight=async(req,res)=>{
    try {
        const {right_name,right_description}=req.body;
        const right=new rightModel({
            staff_Id:req.body.staff_Id,
            right_name,
            right_description
        });
        await right.save();
        res.status(200).json(right);
    } catch (error) {
        res.json(error.message)
    }
}

const deleteRight=async(req,res)=>{
    try {
       await rightModel.findByIdAndDelete(req.params.rightId);
      res.json({"msg":"Delete SuccessFully"})
    } catch (error) {
        res.json(error);
    }
}
const getRight =async(req,res)=>{
    try {
        // const rightId=req.params.rightId;
        // const rights = await rightModel.findById(rightId).populate('staff_Id');
        // res.json(rights);
        const rights = await rightModel.aggregate([
            {
            $lookup: {
                from: 'staffs',
                localField:'staff_Id',
                foreignField: '_id',
                as: 'staff'
            }
        }
    ])
    res.json(rights);
    } catch (error) {
        console.log(error.message);
        res.json(error.message);
    }
}

module.exports ={ createRight,getRight,deleteRight};
const helpModel = require('../models/help.model');
const createHelp=async(req,res)=>{
       try {
        const {title,desccription,helpType}=req.body;
        if(title && desccription && helpType){
       const newHelp = new helpModel({
        userId:req.user._id,
        title,
        desccription,
        helpType
        })
       await newHelp.save();
       res.json(newHelp);
        }else{
            res.json({"msg":"Please Enter the all fields"});
        }
        } catch (error) {
        res.json(error)
       }
}

const findUSerHelp=async(req,res)=>{
    try {
        const helpId = req.params.helpId;
        const help = await helpModel.findById(helpId);
        res.json(help);
    } catch (error) {
        res.json(error);
    }
}

const countHelp=async(req,res)=>{

    try {
        const count = await helpModel.countDocuments();
        res.json({
            count:count
        })
    } catch (error) {
        res.json(error)
    }

}

const deleteHelp=async(req,res)=>{
    try {
    await helpModel.findOneAndDelete(req.params.helpId);
    res.json({"msg":"Delete Successfully"})
    } catch (error) {
        res.json(error)
    }
}

const updateHelp = async (req, res) => {
    try {
        const helpId = req.params.helpId;
        const { title, description, helpType } = req.body;
        if (!title && !description && !helpType) {
            return res.status(400).json({ msg: "Please provide at least one field to update" });
        }
        const updateFields = {};
        if (title) updateFields.title = title;
        if (description) updateFields.description = description;
        if (helpType) updateFields.helpType = helpType;
        const updatedHelp = await helpModel.findOneAndUpdate({ _id: helpId }, updateFields, { new: true });
        if (!updatedHelp) {
            return res.status(404).json({ msg: "Help not found" });
        }
        res.json(updatedHelp);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server Error" });
    }
};

module.exports={createHelp , findUSerHelp ,countHelp,deleteHelp,updateHelp};

const dotenv=require('dotenv');
dotenv.config();
const adminModel = require('../models/admin.model');
const userModel = require('../models/user.model');
const postModel=require('../models/post.model');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const registerAdmin = async (req, res) => {
  try {
    const { adminName, adminEmail, adminPassword, adminConfirmPassword, adminPhone } = req.body;
    if (!adminName || !adminEmail || !adminPassword || !adminConfirmPassword || !adminPhone) {
      return res.status(400).json({ "status": "Failed", "msg": "Please enter all fields" });
    }
    const existingAdmin = await adminModel.findOne({ adminEmail });
    if (existingAdmin) {
      return res.status(409).json({ "status": "Failed", "msg": "Admin already registered" });
    }
    if (adminPassword !== adminConfirmPassword) {
      return res.status(400).json({ "status": "Failed", "msg": "Passwords do not match" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminPassword, salt);
    const newAdmin = new adminModel({
      adminName,
      adminEmail,
      adminPassword:hashedPassword,
      adminPhone
    });

    const savedAdmin = await newAdmin.save();
    const token = jwt.sign({ adminId: savedAdmin._id }, process.env.ADMIN_SECRET, { expiresIn: "12d" });
    savedAdmin.token = token;
    await savedAdmin.save();
    res.status(201).json({
      "status": "success",
      "msg": "Admin registered successfully",
      "token": token
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ "status": "Failed", "msg": "Server error", "error": error.message });
  }
};

const adminLogin = async (req, res) => {
  try {
    const { adminEmail, adminPassword } = req.body;

    if (!adminEmail || !adminPassword) {
      return res.status(400).json({ "status": "Failed", "msg": "Both fields are required" });
    }

    const admin = await adminModel.findOne({ adminEmail });
    if (!admin) {
      return res.status(404).json({ "status": "Failed", "msg": "Admin does not exist" });
    }

    const isMatch = await bcrypt.compare(adminPassword, admin.adminPassword);
    if (!isMatch) {
      return res.status(401).json({ "status": "Failed", "msg": "Password and email do not match" });
    }

    const token = jwt.sign({ adminId: admin._id },process.env.ADMIN_SECRET, { expiresIn: "23d" });
    admin.token = token;
    await admin.save();

    res.status(200).json({
      "status": "success",
      "msg": "Login successfully",
      "token": token
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ "status": "Failed", "msg": "Server error", "error": error.message });
  }
};
const getUsers = async (req, res) => {
    try {
      const users = await userModel.find({});
      res.status(200).json({
        "status": "success",
        "msg": "Users retrieved successfully",
        "data": users
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ "status": "Failed", "msg": "Server error", "error": error.message });
    }
  };
    const getPosts=async(req,res)=>{
      try {
        const posts = await postModel.find({});
        res.json(posts);
    
      } catch (error) {
        res.json(error);
      }
    }
module.exports = {
  registerAdmin,
  adminLogin,
  getUsers,
  getPosts
};




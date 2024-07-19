const userModel = require('../models/user.model');
const bcrypt= require('bcrypt');
const jwt = require('jsonwebtoken');
const {sendOtpToMail}= require('../utils/send.Otp.Email');
const sendOtpPhone= require('../utils/send.Otp.Phone');
const transporter=require('../config/node.mailer');
const dotenv = require('dotenv');

dotenv.config();
const admin = require('../config/firebaseConfig');
const RESISTRATION=async(req,res)=>{
  try {
    const {username,email,password,phone,confirmPassword}=req.body;
    if(username && email && password && phone){
      const user=await userModel.findOne({email});
      if(user){
        res.status(400).json({message:"User already exists"});
      }
      else{
        if(password===confirmPassword){
          const Emailotp=Math.floor(1000 + Math.random() * 9000);
          const Phoneotp=Math.floor(1000 + Math.random() * 9000);
          await sendOtpToMail(email,Emailotp);
          await sendOtpPhone(phone,Phoneotp.toString());
          const salt=await bcrypt.genSalt(10);
          const hashPassword=await bcrypt.hash(password, salt);
          let arr = [];
          if (req.files) {
            req.files.forEach(file => {
              arr.push(file.path);
            });
          }
          const newUser=new userModel({
              username,
              email,
              images:arr,
              password:hashPassword,
              emailOtp:Emailotp,
              phone,
              phoneOtp:Phoneotp
          });
          await newUser.save();
          const token=jwt.sign({userId:newUser._id},process.env.TOKEN_SECRET);
          newUser.token = token;
          newUser.save();
          res.status(201).json({message:"User Created successfully",token:token});
        }
        else{
          res.json({"msg":"password and confirm password not match"})
        }
      }
    }
    else{
        res.status(400).json({message:"Please fill all the fields"})
    }

  } catch (error) {
    console.log(error);
    res.json(error.message);
  }
}


const sendNotification=async(req,res)=>{
  const { title, message } = req.body;
  const user = req.user;
  console.log(user);
  const payload = {
    notification: {
      title,
      body: message,
    },
  };

  try {
    const response = await admin.messaging().sendToDevice(user.token, payload);
    res.send(response);
  } catch (error) {
    console.error('Error sending notification:', error);
    res.status(500).send('Error sending notification');
  }
}


const LOGIN=async(req,res)=>{
    try {
      const {email,password}=req.body;
      if(email && password){
        const user=await userModel.findOne({email});
        if(!user){
          res.status(400).json({message:"User does not exists"})
        }
        else{
          const isMatch=await bcrypt.compare(password,user.password);
          if(isMatch){
            const token=jwt.sign({userId:user._id},process.env.TOKEN_SECRET);
            user.token = token;
            user.emailOtp="";
            user.save();
            
            res.status(200).json({message:"User logged in successfully",token:token});
           
          }
          else{
            res.status(400).json({message:"Incorrect password"})
          }
        }
      }
      else{
          res.status(400).json({message:"Please fill all the fields"})
      }
    } catch (error) {
      res.json(error.message)
    }
}

const updateUser=async(req,res)=>{
  const userId= req.user._id;
  const { username, email, password, phone } = req.body;
  const updatedFields={};
    if (username) updatedFields.username = username;
    if (email) updatedFields.email = email;
    if (phone) updatedFields.phone = phone;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updatedFields.password = await bcrypt.hash(password, salt);
    }
    let arr = [];
    if (req.files) {
      req.files.forEach(file => {
        arr.push(file.path);
      });
    }
    if(arr.length>0){
      updatedFields.images=arr;
    }
    const updateUser=await userModel.findOneAndUpdate({_id:userId},updatedFields,{ new: true });
    if(!updateUser){
      res.json({"msg":"User Not Found"})
    }
  res.json(updateUser);
}


 const changePassword=async(req,res)=>{
  try {
   const {password,confirmPassword}=req.body;
   if(password===confirmPassword){
    const salt= await bcrypt.genSalt(10);
    const newhashPassword= await bcrypt.hash(password,salt);
    await userModel.findByIdAndUpdate(req.user._id,{
      $set:{
        password:newhashPassword
      }
    })
    res.json({"msg":"password change successfully"})
   }
  } catch (error) {
    console.log(error);
    res.json(error);
  }
 }
 const sendUserPasswordResetEmail=async(req,res)=>{
  try {
    const {email}=req.body;
    const user= await userModel.findOne({email:email});
    if(user){
      const secret = user._id + process.env.TOKEN_SECRET;
      const token = jwt.sign({userId:user._id},secret,{expiresIn:"15m"});
      const link = `http://localhost:4000/user/reset/${user._id}/${token}`;
      console.log(link);
      const info=await transporter.sendMail({
        from: 'viratarya2021@gmail.com', 
        to: user.email, 
        subject: "Hello ✔ Reset-Password_Link", 
        html: `<a href=${link}>Click Here </a> Reset Your Password`
      })
      res.json({"msg":"success CHeak Your mail","info":info});
    }
    else{
      res.json({"msg":"You are not valid user"});
    }
  } catch (error) {
    res.json(error);
  }
 }

 const resetPassword=async(req,res)=>{
      const {password,confirmPassword}= req.body;
      const {id,token}=req.params;
      const user = await userModel.findById(id);
      const newSecret= user._id + process.env.TOKEN_SECRET;
     try {
      jwt.verify(token,newSecret);
      if(password && confirmPassword){
      if (password===confirmPassword) {
      const salt= await bcrypt.genSalt(10);
      const newhashPassword= await bcrypt.hash(password,salt);
      await userModel.findByIdAndUpdate(user._id,{
      $set:{
        password:newhashPassword
      }
      })
       res.json({"msg":"password change successfully"})
      } else {
        res.json("Passwords Not Match");
      }
      }else{
        res.json({"msg":"GIve Both Fields"});
      }
     } catch (error) {
      console.log(error);
      res.json(error);
     }
 }

 const logout=async(req,res)=>{
  try {
    const user = await userModel.findById(req.user);
    if (user) {
      user.token="";
      user.save();
      res.json({"status":"success","mag":"LOgout Successfully"})
    } else {
      res.json({"msg":"User Not fount"})
    }
  } catch (error) {
    res.json(error.message);
  }
 }

module.exports={
    RESISTRATION,
    LOGIN,
    updateUser,
    changePassword,
    sendUserPasswordResetEmail,
    resetPassword,
    sendNotification,
    logout
}


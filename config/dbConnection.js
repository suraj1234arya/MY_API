const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const mongoURI = process.env.DBCONNECTION;
mongoose.connect(mongoURI).then(()=>{
  console.log('MongoDB connected...');
})
 .catch((err)=>console.log(err));

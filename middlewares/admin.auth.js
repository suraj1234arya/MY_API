const dotenv = require('dotenv');
dotenv.config();
const adminModel = require('../models/admin.model');
const jwt = require('jsonwebtoken');

const adminAuth = async (req, res, next) => {
  let token;
  const authorization = req.headers.authorization;
  try {
    if(authorization && authorization.startsWith('Bearer')) {
      token = authorization.split(' ')[1];
      const { adminId } = jwt.verify(token, process.env.ADMIN_SECRET);
      req.admin = await adminModel.findById(adminId).select("-password");
      next();
    } else {
      throw new Error('Authorization header is missing or malformed');
      
    }
  } catch (error) {
    return res.status(401).json({ msg: 'Not Authorized', error: error.message });
  }
};
module.exports = adminAuth; 
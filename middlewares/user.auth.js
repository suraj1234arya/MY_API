const dotenv = require('dotenv');
dotenv.config();
const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const userAuth = async (req, res, next) => {
  let token;
  const authorization = req.headers.authorization;
  try {
    if(authorization && authorization.startsWith('Bearer')) {
      token = authorization.split(' ')[1];
      const { userId } = jwt.verify(token, process.env.TOKEN_SECRET);
      req.user = await userModel.findById(userId).select("-password");
      next();
    } else {
      throw new Error('Authorization Header Is Missing or Mailformed');
    }
  } catch (error) {
    return res.status(401).json({ msg: 'Not Authorized', error: error.message });
  }
};
module.exports = userAuth; 
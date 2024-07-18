const jwt = require('jsonwebtoken');
const dotenv= require('dotenv');
dotenv.config();

const generateAccessToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.TOKEN_SECRET, {
    expiresIn: '1h', 
  });
};

module.exports = generateAccessToken;

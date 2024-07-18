const dotenv = require('dotenv');
dotenv.config();
const asyncHandler = require('express-async-handler');
const axios = require('axios');
const querystring = require('querystring');
const User = require('../models/user.model');
const generateAccessToken = require('../utils/generateAccessToken');

// Google Login
const googleLogin = asyncHandler(async (req, res) => {
  const redirectURI = encodeURIComponent(
    `http://localhost:3000/user/v1/verifyGoogle`
  );
  const authURL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.CLIENT_ID}&redirect_uri=${redirectURI}&response_type=code&scope=email%20profile`;

  res.status(201).json({
    success: true,
    message: "Click this link to verify the Google account",
    authURL,
  });
});

// Verify Google Login
const verifyGoogle = asyncHandler(async (req, res) => {
  const { code } = req.query;
  if (!code) {
    return res.status(400).json({ success: false, message: "No code provided" });

  }
  try {
    const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', querystring.stringify({
      code,
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      redirect_uri: 'http://localhost:3000/user/v1/verifyGoogle',
      grant_type: 'authorization_code'
    }));
    console.log("log...............!!!!!!!!!!!!!!!!",tokenResponse);
    const { access_token } = tokenResponse.data; 

    // Retrieve user information using the access token
    const userInfoResponse = await axios.get(`https://www.googleapis.com/oauth2/v2/userinfo?access_token=${access_token}`);
    const { id, email, name } = userInfoResponse.data;

    // Check if the user exists in your database
    let user = await User.findOne({ googleId: id });

    if (!user) {
      // Create a new user if not found
      user = await User.create({
        googleId: id,
        username: name,
        email,
        // accessToken:access_token
      });
    }

    // Generate your own access token
    const accessToken = generateAccessToken(user._id);
    res.status(200).json({
      success: true,
      message: "User registered successfully",
      accessToken, // Return accessToken in the response
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to verify Google account" });
  }
});


module.exports = {
  googleLogin,
  verifyGoogle
};

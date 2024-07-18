const transporter = require('../config/node.mailer');
const sendOtpToMail=async(email,otp)=>{
   try {
    await transporter.sendMail({
        from: 'viratarya2021@gmail.com', 
        to: email, 
        subject: "Hello ✔ OTP Verification", 
        text: `Your otp ${otp}`
      });
   } catch (error) {
    console.log("Error in Sending Mail",error);
   }
}
module.exports = {sendOtpToMail};
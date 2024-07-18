const twilio = require('twilio');
const dotenv = require('dotenv');

dotenv.config();
const accountSid = process.env.A;
const authToken =process.env.B;
const client = new twilio(accountSid, authToken);
const sendOtpPhone = async (phone,otp) => {
     try {
        await client.messages.create({
            body: `Your OTP is: ${otp}`,
            from: '+12567870252',
            to: phone
        });
    } catch (error) {
       console.error("Error sending OTP SMS:", error.message);
}
}

module.exports = sendOtpPhone;
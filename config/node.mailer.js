const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    host:"smtp.gmail.com",
    port:587,
    secure:false,
    auth:{
        user: "viratarya2021@gmail.com",
        pass: "ruco tanw phhm ktzk",
    }
})
module.exports=transporter;
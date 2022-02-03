require("dotenv").config();
const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  service: "gmail",
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
});

var code = otp;

module.exports.sendConfirmationEmail = (userName, userEmail, otp) => {
  console.log("Check");
  transport
    .sendMail({
      from: process.env.USER,
      to: userEmail,
      subject: "Please confirm your account",
      html: "<h1>Email Confirmation</h1>"`<h2>Hello ${userName}</h2>
          <h3>OTP for Account verification is </h3> + <h4> + ${code} + </h4>`,
    })
    .catch((err) => console.log(err));
};

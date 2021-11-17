require('dotenv').config();
const nodemailer = require('nodemailer')

const sendEmail = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.USER,
                pass: process.env.PASS
            }
        })
        await transporter.sendMail({
            from: process.env.USER,
            to: 'sujathagopinath1999@gmail.com',
            subject: 'test',
            text: 'Hello',
        })
        console.log("Email send Successfully")
    } catch (error) {
        console.log(error, 'Email Not Sent')
    }
}

module.exports = sendEmail
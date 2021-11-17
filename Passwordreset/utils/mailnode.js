require('dotenv').config();
const nodemailer = require('nodemailer')

const sendEmail = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            service: "gmail",
            auth: {
                user: 'testdatauser178@gmail.com',
                pass: 'testdatauserpassword'
            }
        })
        await transporter.sendMail({
            from: 'testdatauser178@gmail.com',
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
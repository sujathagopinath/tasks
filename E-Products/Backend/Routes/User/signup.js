const Boom = require("@hapi/boom");
const bcrypt = require("bcryptjs");
const db = require("../../Config/db");
const sql = require("mssql");
const { schema } = require("../../Validationschema/index");
const nodemailer = require("nodemailer");

var otp = Math.random();
otp = otp * 1000000;
otp = parseInt(otp);

const transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  service: "gmail",
  auth: {
    user: "tu78599@gmail.com",
    pass: "testuser123",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

async function getpool() {
  const pool = await db.poolPromise;
  const result = await pool.request();
  return result;
}

const signup = async (req, h) => {
  const userName = req.payload.userName;
  const userEmail = req.payload.userEmail;
  const userPassword = req.payload.userPassword;
  const isAdmin = req.payload.isAdmin;
  const confirmationcode = otp;
  console.log("req", req);

  var mailOptions = {
    from: "tu78599@gmail.com",
    to: req.payload.userEmail,
    subject: "Otp for signup: ",
    html:
      "<h3>OTP for Account verification is </h3>" +
      "<h4>" +
      confirmationcode +
      "</h4>",
  };
  transport.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent", info.messageId);
    console.log("preview url", nodemailer.getTestMessageUrl(info));
    res.send(otp);
  });

  try {
    const { value, error } = schema.validate(req.payload, {
      abortEarly: false,
    });
    if (error) {
      return h.response(error.details).code(400);
    }

    const hashPassword = await bcrypt.hash(userPassword, 10);
    console.log(hashPassword);
    const result = await getpool();
    const somevar = new Promise(async (resolve, reject) => {
      await result
        .input("userName", sql.VarChar(50), userName)
        .input("userEmail", sql.NVarChar(50), userEmail)
        .input("userPassword", sql.NVarChar(sql.MAX), hashPassword)
        .input("isAdmin", sql.Int, isAdmin)
        .input("confirmationcode", sql.Int, confirmationcode)
        .output("responseMessage", sql.VarChar(50))
        .execute("spSignupUserss", (err, data) => {
          if (err) {
            reject(err);
          } else {
            const response = h.response(data);
            resolve(response);
          }
        });
    });
    return somevar;
  } catch (error) {
    throw Boom.serverUnavailable(error);
  }
};

const verify = async (req, h) => {
  if (otp) {
    return h.response("user registered successfully");
  } else {
    return h.response("Incorrect OTP");
  }
};

module.exports = { signup, verify };

const Boom = require("@hapi/boom");
const bcrypt = require("bcryptjs");
const db = require("../../Config/db");
const sql = require("mssql");
const { schema } = require("../../Validationschema/userpattern");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

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

transport.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Ready for message");
    console.log(success);
  }
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
  var verified = false;
  var emailToken = crypto.randomBytes(54).toString("hex");
  var currenturl = "localhost:4000";
  try {
    const { value, error } = schema.validate(req.payload, {
      abortEarly: false,
    });
    if (error) {
      return h.response(error.details).code(400);
    }
    const hashPassword = await bcrypt.hash(userPassword, 10);
    const result = await getpool();
    const somevar = new Promise(async (resolve, reject) => {
      await result
        .input("userName", sql.VarChar(50), userName)
        .input("userEmail", sql.NVarChar(50), userEmail)
        .input("userPassword", sql.NVarChar(sql.MAX), hashPassword)
        .input("isAdmin", sql.Int, isAdmin)
        .input("verified", sql.Int, verified)
        .input("emailToken", sql.NVarChar(sql.MAX), emailToken)
        .output("responseMessage", sql.VarChar(50))
        .execute("spSignupUsers", (err, data) => {
          if (err) {
            reject(err);
          } else {
            const response = h.response(data);
            resolve(response);
          }
        });

      var mailOptions = {
        from: "tu78599@gmail.com",
        to: req.payload.userEmail,
        subject: "Verify for signup: ",
        html: `<h2>${userName}</h2>
      <h4>Verify the email</h4>
      <a href="http://${currenturl}/verify/${emailToken}">verify</a>`,
      };
      transport.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log("Message sent", info.messageId);
        console.log("preview url", nodemailer.getTestMessageUrl(info));
      });
    });
    return somevar;
  } catch (error) {
    throw Boom.serverUnavailable(error);
  }
};

const verify = async (req, h) => {
  var emailToken = req.params.emailToken;
  try {
    const result = await getpool();
    const somevar = new Promise(async (resolve, reject) => {
      await result
        .input("emailToken", sql.NVarChar(sql.MAX), emailToken)
        .output("responseMessage", sql.VarChar(50))
        .execute("spverifys", function (err, data) {
          if (err) {
            reject(err);
          } else {
            const response = h.response(
              "You have successfully verified proceed with login page"
            );
            resolve(response);
          }
        });
    });
    return somevar;
  } catch (error) {
    throw Boom.serverUnavailable(error);
  }
};

const resend = async (req, h) => {
  const userEmail = req.payload.userEmail;
  var verified = false;
  var emailToken = crypto.randomBytes(54).toString("hex");
  var currenturl = "localhost:4000";
  try {
    const { value, error } = schema.validate(req.payload, {
      abortEarly: false,
    });
    if (error) {
      return h.response(error.details).code(400);
    }
    const result = await getpool();
    const somevar = new Promise(async (resolve, reject) => {
      await result
        .input("userEmail", sql.NVarChar(50), userEmail)
        .input("verified", sql.Int, verified)
        .input("emailToken", sql.NVarChar(sql.MAX), emailToken)
        .output("responseMessage", sql.VarChar(50))
        .execute("spresend", (err, data) => {
          if (err) {
            reject(err);
          } else {
            const response = h.response(data);
            resolve(response);
          }
        });

      var mailOptions = {
        from: "tu78599@gmail.com",
        to: req.payload.userEmail,
        subject: "Verify for signup: ",
        html: `<h2>${userEmail} </h2>
      <h4>Verify the email</h4>
      <a href="http://${currenturl}/verify/${emailToken}">verify</a>`,
      };
      transport.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log("Message sent", info.messageId);
        console.log("preview url", nodemailer.getTestMessageUrl(info));
      });
    });
    return somevar;
  } catch (error) {
    throw Boom.serverUnavailable(error);
  }
};

module.exports = { signup, verify, resend };

const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const router = express.Router();
const db = require("../Config/db");
const sql = require("mssql");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userValidation = require("../Validation/uservalidation");
const { authMiddlware } = require("../Middlewares/token");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
// const { default: roles } = require("../Constants/roles");

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

router.post("/signup", async (req, res, next) => {
  try {
    var userName = req.body.userName;
    var userEmail = req.body.userEmail;
    var userPassword = req.body.userPassword;
    var verified = false;
    var emailToken = crypto.randomBytes(54).toString("hex");
    var currenturl = "localhost:5000";
    const hash = await bcrypt.hash(userPassword, 10);
    const result = await getpool();
    await result
      .input("userName", sql.VarChar(50), userName)
      .input("userEmail", sql.NVarChar(50), userEmail)
      .input("userPassword", sql.NVarChar(sql.MAX), hash)
      .input("verified", sql.Int, verified)
      .input("emailToken", sql.NVarChar(sql.MAX), emailToken)
      .output("responseMessage", sql.VarChar(50))
      .execute("spSignupUsers", function (err, data) {
        if (err) {
          res.status(500).json({
            error: {
              message: err,
            },
          });
        } else {
          var mailOptions = {
            from: "tu78599@gmail.com",
            to: req.body.userEmail,
            subject: "Verify for signup: ",
            html: `<h2>Hi ${userName}!!</h2>
           <h4>Verify the email to login your account :)</h4>
           <a href="http://${currenturl}/api/users/verify/${emailToken}">Click here to verify</a>`,
          };
          transport.sendMail(mailOptions, (error, info) => {
            if (error) {
              return console.log(error);
            }
            console.log("Message sent", info.messageId);
            console.log("preview url", nodemailer.getTestMessageUrl(info));
          });
        }
        // res.status(201).send(data["recordset"]);
        res.status(201).send("User created");
      });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/verify/:emailToken", async (req, res) => {
  try {
    const emailToken = req.params.emailToken;
    const result = await getpool();
    result
      .input("emailToken", sql.NVarChar(sql.MAX), emailToken)
      .output("responseMessage", sql.VarChar(50))
      .execute("spverifys", function (err, data) {
        if (err) {
          res.status(500).json({
            error: {
              message: err,
            },
          });
        } else {
          console.log(data);
          res.send("You have successfully verified proceed with login page");
        }
      });
  } catch (error) {
    console.log(error);
  }
});

router.post("/resendlink", async (req, res, next) => {
  try {
    var currenturl = "localhost:5000";
    const userEmail = req.body.userEmail;
    const verified = false;
    const emailToken = crypto.randomBytes(54).toString("hex");
    const result = await getpool();
    result
      .input("userEmail", sql.NVarChar(50), userEmail)
      .input("verified", sql.Int, verified)
      .input("emailToken", sql.NVarChar(sql.MAX), emailToken)
      .output("responseMessage", sql.VarChar(50))
      .execute("spresend", function (err, data) {
        if (err) {
          console.log(err);
        } else {
          console.log(data);
        }
        var mailOptions = {
          from: "tu78599@gmail.com",
          to: req.body.userEmail,
          subject: "Verify for signup: ",
          html: `<h2>${userEmail} </h2>
      <h4>Verify the email</h4>
      <a href="http://${currenturl}/api/users/verify/${emailToken}">verify</a>`,
        };
        transport.sendMail(mailOptions, (error, info) => {
          if (error) {
            return console.log(error);
          }
          console.log("Message sent", info.messageId);
          console.log("preview url", nodemailer.getTestMessageUrl(info));
        });
      });
  } catch (error) {
    res.status(500).send(error);
  }
});

const verifyEmail = async (req, res, next) => {
  const userEmail = req.body.userEmail;
  var verified = req.body.verified;
  const result = await getpool();
  result
    .input("userEmail", sql.NVarChar(50), userEmail)
    .input("verified", sql.Bit, verified)
    .output("responseMessage", sql.VarChar(50))
    .execute("spverified", function (err, data) {
      if (err) {
        res.status(500).json({
          error: {
            message: err,
          },
        });
      } else {
        console.log(data);
        next();
      }
    });
};

router.post("/signin", verifyEmail, async (req, res, next) => {
  try {
    var userEmail = req.body.userEmail;
    var userPassword = req.body.userPassword;
    if (userEmail != null && userPassword != null) {
      const result = await getpool();
      result
        .input("userEmail", sql.NVarChar(50), userEmail)
        .input("userPassword", sql.NVarChar(sql.MAX), userPassword)
        .output("responseMessage", sql.VarChar(50))
        .execute("spSignInUser", function (err, data) {
          if (err) {
            res.status(500).json({
              error: {
                message: err,
              },
            });
          } else {
            result
              .query(
                "Select * from Users where userEmail=" +
                  "'" +
                  req.body.userEmail +
                  "'"
              )
              .then(function (datas) {
                console.log(datas["recordset"][0]["userEmail"] + "RESULTS");
                bcrypt.compare(
                  req.body.userPassword,
                  datas["recordset"][0]["userPassword"],
                  (err, results) => {
                    if (err) {
                      return res.status(500).json({
                        error: {
                          message: err,
                        },
                      });
                    }

                    if (results) {
                      const token = jwt.sign(
                        {
                          userId: datas["recordset"][0]["userId"],
                          role: datas["recordset"][0]["role"],
                          email: datas["recordset"][0]["userEmail"],
                        },
                        process.env.JWT_KEY,
                        {
                          expiresIn: "1h",
                        }
                      );
                      console.log(results);
                      return res.status(200).json({
                        message: "success",
                        userdata: datas["recordset"],
                        access_token: token,
                      });
                    } else {
                      res.status(401);
                      throw new Error("Invalid login credentials");
                    }
                  }
                );
              })
              .catch(function (err) {
                return res.status(404).json({
                  error: {
                    message: "User Does not Exists",
                  },
                });
              });
          }
        });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/getuserdata", authMiddlware, async (req, res) => {
  var userId = req.decoded;
  var userName = req.body.userName;
  var userEmail = req.body.userEmail;
  console.log("userId", userId);
  const result = await getpool();
  result
    .input("userId", sql.Int, userId)
    .input("userName", sql.NVarChar(50), userName)
    .input("userEmail", sql.NVarChar(50), userEmail)
    .output("responseMessage", sql.VarChar(50))
    .execute("spgetuserdata", function (err, data) {
      if (err) {
        return res.status(500).json({
          error: {
            message: err,
          },
        });
      } else {
        console.log("data", data);
        if (data) {
          res.status(200);
          res.send(data);
        } else {
          res.send("No User profile found");
        }
      }
    });
});

router.get("/allusers", async (req, res) => {
  const result = await getpool();
  result
    .query("select * from Users")
    .then(function (data) {
      console.log("data", data);
      if (data) {
        res.status(200);
        res.send(data);
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

router.put("/update", authMiddlware, async (req, res) => {
  var userId = req.decoded;
  var userName = req.body.userName;
  var userEmail = req.body.userEmail;
  var salt = await bcrypt.genSalt(10);
  var userPassword = await bcrypt.hash(req.body.userPassword, salt);
  console.log("id", req.decoded);

  if (userName != null && userEmail != null && userPassword != null) {
    const result = await getpool();
    result
      .input("userName", sql.VarChar(50), userName)
      .input("userEmail", sql.NVarChar(50), userEmail)
      .input("userPassword", sql.NVarChar(sql.MAX), userPassword)
      .input("userId", sql.Int, userId)
      .output("responseMessage", sql.VarChar(50))
      .execute("spUpdateuser", function (err, data) {
        if (err) {
          res.status(400).json({
            error: {
              message: err,
            },
          });
        } else {
          result.query(
            "UPDATE Users set userName= '" +
              userName +
              "' , userEmail= '" +
              userEmail +
              "' ,  userPassword= '" +
              userPassword +
              "' where userId= " +
              userId
          );
          console.log("data", data);
          if (data["output"]["responseMessage"] == "No user profile found") {
            res.status(404).json({
              error: {
                message: "No user profile found",
              },
            });
          } else {
            res.status(200).json({
              message: "updated user profile",
              data: {
                Name: userName,
                email: userEmail,
                password: userPassword,
              },
            });
          }
        }
      });
  }
});

router.put("/promote", authMiddlware, async (req, res) => {
  try {
    
  var userId = req.decoded;
  var role = req.body.role;
  const result = await getpool();
  await result
    .input("userId", sql.Int, userId)
    .input("role", sql.VarChar(10), role) 
    .output("responseMessage", sql.VarChar(50))
    .execute("sppromotes", function (err, data) {
      if (err) {
          res.status(404).send(err)
      }
      else {
        if (req.userId === userId) {
          res.status(200).send('Admin cannot change their role')
        }
        else {
          result.query(
            "UPDATE Users set role= '" +
              role +
              "' where userId= " +
              userId
          );
        }
      }
    })
  }
  catch (error) {
    console.log(error)
}
})


module.exports = { router };

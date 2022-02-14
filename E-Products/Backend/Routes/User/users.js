const Boom = require("@hapi/boom");
const db = require("../../Config/db");
const sql = require("mssql");
const bcrypt = require("bcryptjs");

async function getpool() {
  const pool = await db.poolPromise;
  const result = await pool.request();
  return result;
}

const getuserdata = async (req, h) => {
  try {
    const userId = req.state.sid.userId;
    const userName = req.query.userName;
    const userEmail = req.query.userEmail;
    console.log("get", req.state.sid.userId);
    const result = await getpool();
    const getusers = new Promise(async (resolve, reject) => {
      await result
        .input("userId", sql.Int, userId)
        .input("userName", sql.NVarChar(50), userName)
        .input("userEmail", sql.NVarChar(50), userEmail)
        .output("responseMessage", sql.VarChar(50))
        .execute("spgetuserdata", (err, data) => {
          if (err) {
            reject(err);
          } else {
            const response = h.response(data);
            resolve(response);
          }
        });
    });
    return getusers;
  } catch (error) {
    throw Boom.serverUnavailable(error);
  }
};

const allusers = async (req, h) => {
  try {
    const result = await getpool();
    const allusers = new Promise(async (resolve, reject) => {
      await result
        .query("select * from Users")
        .then(function (data) {
          console.log("allusers", data);
          if (data) {
            const response = h.response(data);
            resolve(response);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    });
    return allusers;
  } catch (error) {
    throw Boom.serverUnavailable(error);
  }
};

const updateuser = async (req, h) => {
  try {
    const userId = req.state.sid.userId;
    const userName = req.payload.userName;
    const userEmail = req.payload.userEmail;
    const salt = await bcrypt.genSalt(10);
    const userPassword = await bcrypt.hash(req.payload.userPassword, salt);
    const result = await getpool();
    const updateusers = new Promise(async (resolve, reject) => {
      await result
        .input("userId", sql.Int, userId)
        .input("userName", sql.NVarChar(50), userName)
        .input("userEmail", sql.NVarChar(50), userEmail)
        .input("userPassword", sql.NVarChar(sql.MAX), userPassword)
        .output("responseMessage", sql.VarChar(50))
        .execute("spUpdateuser", (err, data) => {
          if (err) {
            reject(err);
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
            const response = h.response(data);
            resolve(response);
          }
        });
    });
    return updateusers;
  } catch (error) {
    throw Boom.serverUnavailable(error);
  }
};

module.exports = { getuserdata, allusers, updateuser };

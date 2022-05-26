const Boom = require("@hapi/boom");
const bcrypt = require("bcryptjs");
const db = require("../../Config/db");
const sql = require("mssql");
const { schema } = require("../../Validationschema/userpattern");
const createToken = require("../../utils/token");

async function getpool() {
  const pool = await db.poolPromise;
  const result = await pool.request();
  return result;
}

const signin = async (req, h) => {
  const userEmail = req.payload.userEmail;
  const userPassword = req.payload.userPassword;
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
        .input("userPassword", sql.NVarChar(sql.MAX), userPassword)
        .output("responseMessage", sql.VarChar(50))
        .execute("spSignInUser", (err, data) => {
          if (err) {
            reject(err);
          } else {
            result
              .query(
                "Select * from Users where userEmail=" +
                  "'" +
                  req.payload.userEmail +
                  "'"
              )
              .then(function (datas) {
                console.log(datas["recordset"][0]["userEmail"] + "RESULTS");
                bcrypt.compare(
                  req.payload.userPassword,
                  datas["recordset"][0]["userPassword"]
                );
                console.log(datas);
                req.cookieAuth.set({ userId: datas["recordset"][0]["userId"] });
                const response = h.response({
                  datas,
                });
                resolve(response);
              })

              .catch((err) => {
                console.log(err);
              });
          }
        });
    });
    return somevar;
  } catch (error) {
    throw Boom.serverUnavailable(error);
  }
};

const verifymail = async (req, h, next) => {
  var userEmail = req.payload.userEmail;
  var verified = req.payload.verified;
  try {
    const result = await getpool();
    const somevar = new Promise(async (resolve, reject) => {
      await result
        .input("userEmail", sql.NVarChar(50), userEmail)
        .input("verified", sql.Bit, verified)
        .output("responseMessage", sql.VarChar(50))
        .execute("spverified", function (err, data) {
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

module.exports = { signin, verifymail };

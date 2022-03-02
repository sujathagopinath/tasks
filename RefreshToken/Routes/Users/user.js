const Boom = require("@hapi/boom");
const bcrypt = require("bcryptjs");
const db = require("../../DatabaseConnection/index");
const sql = require("mssql");
const createToken = require("../../Utils/token");
// const refreshtokens = require("../../Utils/token");
const crypto = require("crypto");

async function getpool() {
  const pool = await db.poolPromise;
  const result = await pool.request();
  return result;
}

const signup = async (req, h) => {
  var name = req.payload.name;
  var email = req.payload.email;
  var password = req.payload.password;
  var age = req.payload.age;
  var refreshtoken;
  try {
    const hashPassword = await bcrypt.hash(password, 10);
    const result = await getpool();
    const somevar = new Promise(async (resolve, reject) => {
      await result
        .input("name", sql.NVarChar(50), name)
        .input("email", sql.NVarChar(50), email)
        .input("password", sql.NVarChar(sql.MAX), hashPassword)
        .input("age", sql.Int, age)
        .input("refreshtoken", sql.NVarChar(sql.MAX), refreshtoken)
        .output("responseMessage", sql.VarChar(50))
        .execute("spSignupUsers", (err, data) => {
          if (err) {
            console.log(err);
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

const signin = async (req, h) => {
  const email = req.payload.email;
  const password = req.payload.password;
  var refreshtoken = crypto.randomBytes(54).toString("hex");
  console.log(refreshtoken);
  try {
    const result = await getpool();
    const somevar = new Promise(async (resolve, reject) => {
      await result
        .input("email", sql.NVarChar(50), email)
        .input("password", sql.NVarChar(sql.MAX), password)
        .input("refreshtoken", sql.NVarChar(sql.MAX), refreshtoken)
        .output("responseMessage", sql.VarChar(50))
        .execute("spSignInUserss", (err, data) => {
          if (err) {
            reject(err);
          } else {
            result
              .query(
                "update Customers set refreshtoken= '" +
                  refreshtoken +
                  "' where email=" +
                  "'" +
                  req.payload.email +
                  "'"
              )
              .then(function (datas) {
                console.log(datas);
                //     // console.log(datas["recordset"][0]["email"] + "RESULTS");
                bcrypt.compare(
                  req.payload.password,
                  datas["recordset"][0]["password"]
                );
                //     // req.cookies.name = "hello";
                //     // console.log("refresh", req.state.sid);
                // let refreshtoken = req.state.refreshtokens;
                //     // let refreshtoken = req.state.;
                const response = h
                  .response({
                    datas,
                    accesstoken: createToken(datas),
                    refreshtoken: refreshtokens(datas),
                  })
                  .state("refreshtokened", refreshtoken);
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

module.exports = { signup, signin };

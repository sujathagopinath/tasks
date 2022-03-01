const Boom = require("@hapi/boom");
const bcrypt = require("bcryptjs");
const db = require("../../DatabaseConnection/index");
const sql = require("mssql");

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

  try {
    const hashPassword = await bcrypt.hash(password, 10);
    const result = await getpool();
    const somevar = new Promise(async (resolve, reject) => {
      await result
        .input("name", sql.NVarChar(50), name)
        .input("email", sql.NVarChar(50), email)
        .input("password", sql.NVarChar(sql.MAX), hashPassword)
        .input("age", sql.Int, age)
        .output("responseMessage", sql.VarChar(50))
        .execute("spSignupUser", (err, data) => {
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

const signin = async (req, h) => {
  const email = req.payload.email;
  const password = req.payload.password;
  try {
    const result = await getpool();
    const somevar = new Promise(async (resolve, reject) => {
      await result
        .input("email", sql.NVarChar(50), email)
        .input("password", sql.NVarChar(sql.MAX), password)
        .output("responseMessage", sql.VarChar(50))
        .execute("spSignInUser", (err, data) => {
          if (err) {
            reject(err);
          } else {
            result
              .query(
                "Select * from Customers where email=" +
                  "'" +
                  req.payload.email +
                  "'"
              )
              .then(function (datas) {
                console.log(datas);
                // console.log(datas["recordset"][0]["email"] + "RESULTS");
                // bcrypt.compare(
                //   req.payload.password,
                //   datas["recordset"][0]["password"]
                // );
                // req.cookieAuth.set({ userId: datas["recordset"][0]["userId"] });
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

module.exports = { signup, signin };

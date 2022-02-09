const Boom = require("@hapi/boom");
const db = require("../../Config/db");
const sql = require("mssql");

async function getpool() {
  const pool = await db.poolPromise;
  const result = await pool.request();
  return result;
}

const getuserdata = async (req, h) => {
  var userId = req.decoded;
  const userName = req.payload.userName;
  const userEmail = req.payload.userEmail;
  console.log(userId);
  try {
    const result = await getpool();
    const somevar = new Promise(async (resolve, reject) => {
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
    return somevar;
  } catch (error) {
    throw Boom.serverUnavailable(error);
  }
};

module.exports = { getuserdata };

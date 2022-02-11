const Boom = require("@hapi/boom");
const db = require("../../Config/db");
const sql = require("mssql");

async function getpool() {
  const pool = await db.poolPromise;
  const result = await pool.request();
  return result;
}

const getuserdata = async (req, h) => {
  try {
    const { userId } = req.state;
    const userName = req.query.userName;
    const userEmail = req.query.userEmail;
    console.log(req.state);
    // console.log('req',req);
    // console.log(req.state);
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

module.exports = { getuserdata };

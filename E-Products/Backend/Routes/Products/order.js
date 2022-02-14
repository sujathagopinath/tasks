const Boom = require("@hapi/boom");
const db = require("../../Config/db");
const sql = require("mssql");

async function getpool() {
  const pool = await db.poolPromise;
  const result = await pool.request();
  return result;
}

const order = async (req, h) => {
  var userId = req.state.sid.userId;
  var productId = req.query.productId;
  var productname = req.payload.productname;
  try {
    const result = await getpool();
    const somevar = new Promise(async (resolve, reject) => {
      await result
        .input("userId", sql.Int, userId)
        .input("productId", sql.Int, productId)
        .input("productname", sql.NVarChar(50), productname)
        .execute("sporder", function (err, data) {
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

const allorders = async (req, h) => {
  try {
    const result = await getpool();
    const order = new Promise(async (resolve, reject) => {
      await result
        .query("select * from orders")
        .then(function (data) {
          if (data) {
            const response = h.response(data);
            resolve(response);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    });
    return order;
  } catch (error) {
    throw Boom.serverUnavailable(error);
  }
};

module.exports = {
  order,
  allorders,
};

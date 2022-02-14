const Boom = require("@hapi/boom");
const db = require("../../Config/db");
const sql = require("mssql");

async function getpool() {
  const pool = await db.poolPromise;
  const result = await pool.request();
  return result;
}

const cart = async (req, h) => {
  var productId = req.query.productId;
  var productname = req.payload.productname;
  var discount = req.payload.discount;
  var quantity = req.payload.quantity;
  var userId = req.state.sid.userId;
  var total;

  try {
    const result = await getpool();
    const somevar = new Promise(async (resolve, reject) => {
      await result
        .input("productId", sql.Int, productId)
        .input("productname", sql.NVarChar(50), productname)
        .input("discount", sql.Int, discount)
        .input("quantity", sql.Int, quantity)
        .input("userId", sql.Int, userId)
        .input("total", sql.Int, total)
        .execute("spitem", function (err, data) {
          if (err) {
            reject(err);
          } else {
            if (data) {
              total = quantity * discount;
            }
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

const removeitem = async (req, h) => {
  var productId = req.query.productId;
  try {
    const result = await getpool();
    const somevar = new Promise(async (resolve, reject) => {
      await result
        .input("productId", sql.Int, productId)
        .execute("spcartdelete", function (err, data) {
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

module.exports = {
  cart,
  removeitem,
};

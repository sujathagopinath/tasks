const Boom = require("@hapi/boom");
const db = require("../../Config/db");
const sql = require("mssql");
const fs = require("fs");
const { schemas } = require("../../Validationschema/productpattern");

async function getpool() {
  const pool = await db.poolPromise;
  const result = await pool.request();
  return result;
}

const handlefileUpload = (file) => {
  const fileName = file.hapi.filename;
  const data = file._data;
  fs.writeFileSync("./uploads/" + fileName, data);
  return fileName;
};

const createproduct = async (req, h) => {
  const productname = req.payload.productname;
  const productnote = req.payload.productnote;
  const price = req.payload.price;
  const custId = req.state.sid.userId;
  const products = req.payload;
  const fileName = handlefileUpload(req.payload.productimage);
  const productimage = fileName;
  products.productimage = fileName;

  try {
    const { value, error } = schemas.validate(products, {
      abortEarly: false,
    });
    if (error) {
      return h.response(error.details).code(400);
    }
    const result = await getpool();
    const somevar = new Promise(async (resolve, reject) => {
      await result
        .input("productname", sql.NVarChar(50), productname)
        .input("productnote", sql.NVarChar(50), productnote)
        .input("price", sql.Int, price)
        .input("productimage", sql.VarChar(50), productimage)
        .input("custId", sql.Int, custId)
        .output("responseMessage", sql.VarChar(50))
        .execute("spProductcreate", function (err, data) {
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

const getproduct = async (req, h) => {
  var productId = req.query.productId;
  try {
    const result = await getpool();
    const getprod = new Promise(async (resolve, reject) => {
      await result
        .input("productId", sql.Int, productId)
        .query(`select * from Products where productId = @productId`)
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
    return getprod;
  } catch (error) {
    throw Boom.serverUnavailable(error);
  }
};
const allproducts = async (req, h) => {
  try {
    const result = await getpool();
    const allproducts = new Promise(async (resolve, reject) => {
      await result
        .query("select * from Products")
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
    return allproducts;
  } catch (error) {
    throw Boom.serverUnavailable(error);
  }
};

const updateproduct = async (req, h) => {
  var productname = req.payload.productname;
  var productnote = req.payload.productnote;
  var price = req.payload.price;
  var productId = req.query.productId;
  var discount = req.payload.discount;
  try {
    const result = await getpool();
    const updateprod = new Promise(async (resolve, reject) => {
      await result
        .input("productname", sql.NVarChar(50), productname)
        .input("productnote", sql.NVarChar(50), productnote)
        .input("price", sql.Int, price)
        .input("discount", sql.Int, discount)
        .input("productId", sql.Int, productId)
        .output("responseMessage", sql.VarChar(50))
        .execute("spupdateproducts", function (err, data) {
          if (err) {
            reject(err);
          } else {
            if (price >= 1000) {
              discount = price - discount;
              result.query(
                "UPDATE Products set productname= '" +
                  productname +
                  "', productnote= '" +
                  productnote +
                  "' ,  price= '" +
                  price +
                  "' , discount= '" +
                  discount +
                  "' where productId= '" +
                  productId
              );
            } else {
              discount = price;
              result.query(
                "UPDATE Products set productname= '" +
                  productname +
                  "', productnote= '" +
                  productnote +
                  "' , price= '" +
                  price +
                  "', discount= '" +
                  discount +
                  "' where productId= '" +
                  productId
              );
            }
          }
          const response = h.response(data);
          resolve(response);
        });
    });

    return updateprod;
  } catch (error) {
    throw Boom.serverUnavailable(error);
  }
};

const deleteproduct = async (req, h) => {
  var productId = req.query.productId;
  try {
    const deleteprod = new Promise(async (resolve, reject) => {
      await result
        .input("productId", sql.Int, productId)
        .execute("spdel", function (err, data) {
          if (err) {
            reject(err);
          } else {
            const response = h.response(data);
            resolve(response);
          }
        });
    });
    return deleteprod;
  } catch (error) {
    throw Boom.serverUnavailable(error);
  }
};

module.exports = {
  createproduct,
  getproduct,
  allproducts,
  updateproduct,
  deleteproduct,
};

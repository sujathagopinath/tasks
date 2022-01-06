const express = require('express');
const productRoute = express.Router();
const db = require('../config/db');
const sql = require('mssql');
const jwt = require('jsonwebtoken');
const authenticate = require('../tokenValidation/token');
const productvalidation = require('../Validation/productvalidation');

async function getpool() {
  const pool = await db.poolPromise;
  const result = await pool.request();
  return result;
}

productRoute.post('/create',  authenticate, async (req, res, next) => {
    const {productname, price } = req.body
    console.log("body", req.body)
    console.log("decode", req.decoded)
    const custId = req.decoded
    if (productname != null && price != null) {
        const result = await getpool();
        result
            .input('productname', sql.NVarChar(50), productname)
            .input('price', sql.Int, price)
            .input('custId', sql.Int, custId)
            .output('responseMessage', sql.VarChar(50))
            .execute('spProductcreate', function (err, data) {
                if (err) {
                    res.status(400).json({
                        error: {
                            message: err
                        }
                       
                    })
                }
                else {
                    console.log("productdata", data)
                    if (data['output']['responseMessage'] == 'success') {
                        res.status(201).json({
                            message: "Product has been created",
                            data: {
                                ProductName: productname,
                                Price: price,
                                productId: data['recordset'][0]['productId'],
                                UserId:custId
                            }
                        });
                    }
                    else {
                        res.status(404).json({
                            error: {
                                message:'Product creation failed'
                            }
                        })
                    }
                }
            })
    }
})

productRoute.get('/getproduct/:productId', async (req, res) => {
    var productId = req.params.productId
    console.log('productId', productId)
    const result = await getpool();
    result.input("params", sql.Int, productId)
        .query(`select * from Products where productId = @params`)
        .then(function (dbData) {
            if (dbData == null || dbData.length === 0)
                res.status(200)
                res.send(dbData)
            console.dir(`Your Products ${productId}`);
            console.dir(dbData);
        })
        .catch(function (error) {
            console.dir(error);
        });
})

productRoute.get('/allproducts', async (req, res) => {
    const result = await getpool();
    result.query('select * from Products')
        .then(function (data) {
            console.log('data',data)
        if (data) {
            res.status(200)
            res.send(data)
            }
        }).catch((err) => {
            console.log(err)
        })
})

productRoute.get('/deleteproduct/:productId',authenticate, async (req, res) => {
    var userId = req.decoded
    var productId = req.params.productId
    console.log('productId', userId)
    console.log('productId', productId)
    const result = await getpool();
    result.input("userId", sql.Int, userId)
        .input("params", sql.Int, productId)
        .execute('spdeleted', function (err, data) {
            if (err) {
                res.status(404).json(err)
            }
            else {
                console.log("data", data)
                if (data) {
                    res.status(200).json({
                        message:"User and product has been deleted successfully"
                    })
                }
            }
            
        })
})


module.exports = {productRoute}
const express = require('express');
const productRoute = express.Router();
const db = require('../config/db');
const sql = require('mssql');
const jwt = require('jsonwebtoken');
const {  authMiddlware,isAdmin  }  = require('../Middlewares/token');
const productvalidation = require('../Validation/productvalidation');

async function getpool() {
  const pool = await db.poolPromise;
  const result = await pool.request();
  return result;
}

productRoute.post('/create',  authMiddlware, isAdmin, async (req, res, next) => {
    const {productname,productnote,price } = req.body
    console.log("body", req.body)
    console.log("decode", req.decoded)
    const custId = req.decoded
    if (productnote!=null && productname != null && price != null) {
        const result = await getpool();
        result.input('productname', sql.NVarChar(50), productname)
            .input('productnote', sql.NVarChar(50), productnote)
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
                                ProductNote:productnote,
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

productRoute.put('/update/:productId', authMiddlware, async (req, res) => {
    var productname = req.body.productname
    var productnote = req.body.productnote
    var price = req.body.price
    var productId = req.params.productId
    var discount = req.body.discount;
    console.log("prodId",productId)
   
    if (productname!=null && productnote!=null && price!=null) {
        const result = await getpool();
        result.input('productname',sql.NVarChar(50),productname)
            .input('productnote', sql.NVarChar(50), productnote)
            .input('price', sql.Int, price)
            .input('discount',sql.Int,discount)
            .input('productId',sql.Int,productId)
            .output('responseMessage', sql.VarChar(50))
            .execute('spupdateproduct', function (err, data) {
                if (err) {
                    res.status(400).json({
                        error: {
                            message: err
                        }
                       
                    })
                }
                else {
                     console.log("data", data)
                    if (price >= 1000) {
                        discount = price-discount
                        result.query("UPDATE Products set productname= '" + productname + "', productnote= '" + productnote + "' ,  price= '" + price + "' , discount= '" + discount + "' where productId= '" + productId)
                        console.log("discount value", discount);
                        console.log("data", data)
                        res.status(200).json({
                            message: 'updated Products with Discount',
                            data: {
                                ProdName: productname,
                                ProdNote: productnote,
                                Price: price,
                                Discount:discount
                            }
                        })
                    }
                    else {
                        discount = 0
                        result.query("UPDATE Products set productname= '" + productname + "', productnote= '" + productnote + "' , price= '" + price + "', discount= '" + discount + "' where productId= " + productId)
                        res.status(200).json({
                            data: {
                                message:  'Products got updated'
                            }
                        });
                    }
                    // res.status(404).json({
                    //     error: {
                    //         message:'No products got updated'
                    //     }
                    // })
                }
            })
    }
})

productRoute.delete('/deleteproduct/:productId', async (req, res) => {
    var productId = req.params.productId
    console.log('productId', productId)
    const result = await getpool();
    result
        .input("params", sql.Int, productId)
        .execute('spdel', function (err, data) {
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
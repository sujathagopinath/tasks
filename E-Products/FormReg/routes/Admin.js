const express = require('express');
const Adminrouter = express.Router();

Adminrouter.get('/allusers', async (req, res) => {
    const result = await getpool();
    result.query('select * from Users')
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

Adminrouter.get('/allproducts', async (req, res) => {
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

Adminrouter.put('/update/:productId',authenticate, async (req, res) => {
    var productname = req.body.productname
    var productnote = req.body.productnote
    var price = req.body.price
    var productId = req.params.productId
    var discount = req.body.discount;
    console.log("prodId",productId)
   
    if (productname!=null && productnote!=null && price!=null) {
        const result = await getpool();
        result.input('productname',sql.NVarChar(50),productname)
            .input('productnote', sql.NVarChar(50),productnote)
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
                        result.query("UPDATE Products set productname= '" + productname + "', productnote= '" + productnote + "' , price= '" + price + "' , discount= '" + discount + "' where productId= '" + productId)
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
                }
            })
    }
})


module.exports = { Adminrouter }
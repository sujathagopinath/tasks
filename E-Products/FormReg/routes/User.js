const express = require('express');
const router = express.Router();
const db = require('../config/db');
const sql = require('mssql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const middleware = require('../Validation/uservalidation');
const {  authMiddlware }  = require('../Middlewares/token')

async function getpool() {
  const pool = await db.poolPromise;
  const result = await pool.request();
  return result;
}

router.post('/signup', middleware, (req, res, next) => {
    try {
        var userName = req.body.userName
        var userEmail = req.body.userEmail
        var userPassword = req.body.userPassword
        var isAdmin = req.body.isAdmin
        if (userName != null && userEmail != null && userPassword != null && isAdmin != null) {
            bcrypt.hash(userPassword, 10, async (err, hash) => {
                if (err) {
                    return res.status(500).json({
                        error: {
                            message: err
                        }
                    });
                }
       
                else {
                    const result = await getpool();
                    result.input('userName', sql.VarChar(50), userName)
                        .input('userEmail', sql.NVarChar(50), userEmail)
                        .input('userPassword', sql.NVarChar(sql.MAX), hash)
                        .input('isAdmin', sql.Int, isAdmin)
                        .output('responseMessage', sql.VarChar(50))
                        .execute('spSignupUser', function (err, data) {
                            if (err) {
                                res.status(500).json({
                                    error: {
                                        message: err
                                    }
                                });
                            }
                            else {
                                console.log(data);
                                if (data['output']['responseMessage'] == 'Failed') {
                                    res.status(404).json({
                                        error: {
                                            message: 'User Exist'
                                        }
                                    });
                                }
                                else {
                                    res.status(201)
                                }
                            }
                        });
                }
            })
        }
    } catch (error) {
      res.status(500).send('Server Error')
    }
       
});

router.post('/signin', async (req, res, next) => {
     var userEmail = req.body.userEmail
    var userPassword = req.body.userPassword
   
    if (userEmail != null && userPassword != null) {
        const result = await getpool();
        result.input('userEmail', sql.NVarChar(50), userEmail)
            .input('userPassword', sql.NVarChar(sql.MAX), userPassword)
            .output('responseMessage', sql.VarChar(50))
            .execute('spSignInUser', function (err, data) {
                if (err) {
                    res.status(500).json({
                        error:
                        {
                            message: err
                        }
                    });
                }
                else {
                    result.query('Select * from Users where userEmail=' + "'" + req.body.userEmail + "'")
                        .then(function (datas) {
                            console.log(datas['recordset'][0]['userEmail'] + 'RESULTS');
                            bcrypt.compare(req.body.userPassword, datas['recordset'][0]['userPassword'], (err, results) => {
                                if (err) {
                                    return res.status(500).json({
                                        error:
                                        {
                                            message: err
                                        }
                                    });
                                }
                               
                                if (results) {
                                    const token = jwt.sign({
                                        userId: datas['recordset'][0]['userId'],
                                        isAdmin: datas['recordset'][0]['isAdmin'],
                                        email: datas['recordset'][0]['userEmail'],
                                        
                                    },
                                        process.env.JWT_KEY,
                                        {
                                            expiresIn: '1h'
                                        },
                                    );
                                    console.log(results);
                                    return res.status(200).json({
                                        message: 'success',
                                        userdata: datas['recordset'],
                                        access_token: token,
                                    });
                                }
                                return res.status(404).json({
                                    error:
                                    {
                                        message: 'Incorrect Password'
                                    }
                                });
                            });
                        }).catch(function (err) {
                            return res.status(404).json({
                                error:
                                {
                                    message: 'User Does not Exists'
                                }
                            });
                        });
                }
            });
    }
    else {
        return res.status(404).json({
            error:
            {
                message: 'Not found '
            }
        });
    }
});

router.get('/getuserdata', authMiddlware, async (req, res) => {
    var userId = req.decoded
    var userName = req.body.userName
    var userEmail = req.body.userEmail
    console.log('userId', userId)
    const result = await getpool();
    result.input("userId", sql.Int, userId)
        .input("userName", sql.NVarChar(50), userName)
        .input("userEmail", sql.NVarChar(50), userEmail)
        .output('responseMessage', sql.VarChar(50))
        .execute('spgetuserdata', function (err, data) {
            if (err) {
                return res.status(500).json({
                    error: {
                        message: err
                    }
                });
            }
            else {
                console.log('data', data)
                if (data) {
                    res.status(200)
                    res.send(data)
                }
                else {
                    res.send('No User profile found')
                }
            }
        })
        
})

router.get('/allusers', async (req, res) => {
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


router.put('/update',  authMiddlware, async (req, res) => {
    var userId =req.decoded
    var userName = req.body.userName
    var userEmail = req.body.userEmail
    var salt = await bcrypt.genSalt(10);
    var userPassword = await bcrypt.hash(req.body.userPassword, salt);
    console.log('id',req.decoded)
   
    if (userName !=null && userEmail != null && userPassword != null) {
        const result = await getpool();
        result.input('userName',sql.VarChar(50),userName)
            .input('userEmail', sql.NVarChar(50), userEmail)
            .input('userPassword', sql.NVarChar(sql.MAX), userPassword)
            .input('userId', sql.Int, userId)
            .output('responseMessage', sql.VarChar(50))
            .execute('spUpdateuser', function (err, data) {
                if (err) {
                    res.status(400).json({
                        error: {
                            message: err
                        }
                       
                    })
                }
                else {
                    result.query("UPDATE Users set userName= '" + userName + "' , userEmail= '" + userEmail + "' ,  userPassword= '" + userPassword + "' where userId= " + userId)
                    console.log("data", data)
                    if (data['output']['responseMessage'] == 'No user profile found') {
                        res.status(404).json({
                            error: {
                                message: 'No user profile found'
                            }
                        });
                    }
                    else {
                        res.status(200).json({
                            message: 'updated user profile',
                            data: {
                                Name:userName,
                                email: userEmail,
                                password: userPassword
                            }
                        })
                    }
                }
            })
    }
})


module.exports = { router }
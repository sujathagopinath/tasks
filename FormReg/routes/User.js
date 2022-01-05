const express = require('express');
const router = express.Router();
const db = require('../config/db');
const sql = require('mssql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const middleware = require('../Validation/middleware');

async function getpool() {
  const pool = await db.poolPromise;
  const result = await pool.request();
  return result;
}

router.post('/signup', middleware, (req, res, next) => {
    var userEmail = req.body.userEmail
    var userPassword = req.body.userPassword
    if (userEmail != null && userPassword != null) {
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
                result.input('userEmail', sql.NVarChar(50), userEmail)
                    .input('userPassword', sql.NVarChar(sql.MAX), hash)
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
                                res.status(201).json({
                                    message: 'Success',
                                    data: {
                                        email: userEmail,
                                        password: hash,
                                        userId: data['recordset'][0]['userId']
                                    }
                                });
                            }
                        }
                    });
            }
        });
    }
    else {
        return res.status(404).json({
            error: {
                message: 'not found'
            }
        });
    }
});

router.post('/signin', async (req, res, next) => {
     var userEmail = req.body.userEmail
    var userPassword = req.body.userPassword
    if (userEmail != null && userPassword != null) {
        const result = await getpool();
        result.
            input('userEmail', sql.NVarChar(50), userEmail)
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
                    result.query('Select * from signupUser where userEmail=' + "'" + req.body.userEmail + "'")
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
                                } if (results) {
                                    const token = jwt.sign({
                                        email: datas['recordset'][0]['userEmail'],
                                        userId: datas['recordset'][0]['userId'],
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
                            return res.status(500).json({
                                error:
                                {
                                    message: 'Check User Details'
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

router.get('/getusers/:userId', async (req, res) => {
    var userId = req.params.userId
    console.log('userId', userId)
    const result = await getpool();
    result.input("params", sql.Int, userId)
        .query(`select * from signupUser where userId = @params`)
        .then(function (dbData) {
            if (dbData == null || dbData.length === 0)
                res.status(200)
                res.send(dbData)
            console.dir(`User with Code ${userId}`);
            console.dir(dbData);
        })
        .catch(function (error) {
            console.dir(error);
        });
})

router.post('/update/:userId', async (req, res) => {
    const userEmail = req.body.userEmail
    const salt = await bcrypt.genSalt(10);
    const userPassword = await bcrypt.hash(req.body.userPassword, salt);
   
    if (userEmail != null && userPassword != null) {
        const result = await getpool();
        result.input('userEmail', sql.NVarChar(50), userEmail)
            .input('userPassword', sql.NVarChar(sql.MAX), userPassword)
            .input('userId', sql.Int, req.params.userId)
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
                    result.query("UPDATE signupUser set userEmail= '" + userEmail + "' ,  userPassword= '" + userPassword + "' where userId= " + req.params.userId)
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
                                email: userEmail,
                                password: userPassword
                            }
                        })
                    }
                }
            })
    }
})


router.get('/deleteuser/:userId', async (req, res) => {
    var userId = req.params.userId
    console.log('userId', userId)
    const result = await getpool();
    result.input("params", sql.Int, userId)
        .query(`DELETE from signupUser where userId = @params`)
        .then(function (dbData) {
            if (dbData == null || dbData.length === 0)
                res.status(200)
                res.send(dbData)
            console.dir(`DELETED with Code ${userId}`);
            console.dir(dbData);
        })
        .catch(function (error) {
            console.dir(error);
        });
})

module.exports = { router }
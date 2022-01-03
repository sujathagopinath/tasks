const express = require('express');
const app = express();
const sql = require('mssql');
const bcrypt = require('bcrypt');
const db = require('./db')
const jwt = require('jsonwebtoken')

app.use(express.json());
app.use(express.urlencoded({ extended: false }))



async function getpool() {
    const pool = await db.poolPromise;
    const result = await pool.request();
  return result;
}

app.post('/signup', (req, res, next) => {
    var userEmail = req.body.userEmail
    var userPassword = req.body.userPassword
    // console.log("email", userEmail)
   
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
                result.input('userEmail', sql.NVarChar(50), req.body.userEmail)
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
                                        email: req.body.userEmail,
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

app.post('/signin', async (req, res, next) => {
     var userEmail = req.body.userEmail
    var userPassword = req.body.userPassword
    if (userEmail != null && userPassword != null) {
        const result = await getpool();
        result.
            input('userEmail', sql.NVarChar(50), req.body.userEmail)
            .input('userPassword', sql.NVarChar(sql.MAX), req.body.userPassword)
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
        return res.status(422).json({
            error:
            {
                message: 'Parameter Not Supplied'
            }
        });
    }
});

app.listen('5000', (req, res) => {
    console.log('Server started at 5000')
})
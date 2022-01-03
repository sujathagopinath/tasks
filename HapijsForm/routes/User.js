const sql = require('mssql');
const bcrypt = require('bcrypt');
const db = require('../config/db')
const Joi = require('@hapi/joi')
const jwt = require('jsonwebtoken')

async function getpool() {
    const pool = await db.poolPromise;
    const result = await pool.request();
  return result;
}
module.exports = [
    {
        method: 'POST',
        path: '/signup',
        options: {
            validate: {
                payload: Joi.object({
                    userEmail: Joi
                        .string()
                        .min(6)
                        .email()
                        .required(),
                    userPassword: Joi
                        .string()
                        .regex(/^[a-zA-Z0-9]{5,10}$/)
                        .required()
                }),
                failAction: (request, h, error) => {
                    return error.isJoi ? h.response(error.details[0]).takeover() : h.response(error).takeover();
                }
            }
        },

        handler: async (req, h) => {
            var userEmail = req.payload.userEmail
            var userPassword = req.payload.userPassword
            // console.log("email", userEmail)
            if (userEmail != null && userPassword != null) {
                bcrypt.hash(userPassword, 10, async (err, hash) => {
                    if (err) {
                        return h.code(500).json({
                            error: {
                                message: err
                            }
                        });
                    }
                    else {
                        const result = await getpool();
                        result.input('userEmail', sql.NVarChar(50), req.payload.userEmail)
                            .input('userPassword', sql.NVarChar(sql.MAX), hash)
                            .output('responseMessage', sql.VarChar(50))
                            .execute('spSignupUser', function (err, data) {
                        if (err) {
                           return h.response.status(500).json({
                                error: {
                                    message: err
                               }
                           });
                        }
                        else {
                            console.log("data",data);
                            if (data['output']['responseMessage'] == 'Failed') {
                                h.response.code(404).json({
                                    error: {
                                        message: 'User Exist'
                                    }
                                });
                            }
                            else {
                                h.response.code(201).json({
                                    message: 'Success',
                                    data: {
                                        email: req.payload.userEmail,
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
                return h.response.status(404).json({
                    error: {
                        message: 'not found'
                    }
                });
            }
        }
    },
    {
        method: 'POST',
        path: '/login',
        options: {
            validate: {
                payload: Joi.object({
                    userEmail: Joi
                        .string()
                        .min(6)
                        .email()
                        .required(),
                    userPassword: Joi
                        .string()
                        .regex(/^[a-zA-Z0-9]{5,10}$/)
                        .required()
                }),
                failAction: (request, h, error) => {
                    return error.isJoi ? h.response(error.details[0]).takeover() : h.response(error).takeover();
                }
            }
        },
        handler:async(req,h)=> {
            var userEmail = req.payload.userEmail
            var userPassword = req.payload.userPassword
            if (userEmail != null && userPassword != null) {
                const result = await getpool();
                result.input('userEmail', sql.NVarChar(50), req.payload.userEmail)
                    .input('userPassword', sql.NVarChar(sql.MAX), req.payload.userPassword)
                    .output('responseMessage', sql.VarChar(50))
                    .execute('spSignInUser', function (err, data) {
                        if (err) {
                            h.response(err).code(500)
                        }
                        else {
                            result.query('Select * from signupUser where userEmail=' + "'" + req.payload.userEmail + "'")
                                .then(function (datas) {
                                    console.log(datas['recordset'][0]['userEmail'] + 'RESULTS');
                                    bcrypt.compare(req.payload.userPassword, datas['recordset'][0]['userPassword'], (err, results) => {
                                        if (err) {
                                            return h.response(err).code(500)
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
                                            return h.response({
                                                message: 'success',
                                                userdata: datas['recordset'],
                                                access_token: token,
                                            }).code(200)
                                        }
                                        return h.response('Incorrect Password').code(404)
                                    });
                                }).catch(function (err) {
                                    return h.response(err).code(500)
                                });
                        }
                    });
            }
            else {
                return h.response('Check User Details').code(400)
            }
        }
    }
    
]
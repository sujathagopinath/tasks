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
                    userName: Joi.string()
                        .min(4)
                        .max(20)
                        .required(),
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
            var userName = req.payload.userName
            var userEmail = req.payload.userEmail
            var userPassword = req.payload.userPassword
            
            if (userName!=null && userEmail != null && userPassword != null) {
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
                        result.input('userName',sql.VarChar(50),userName)
                            .input('userEmail', sql.NVarChar(50), userEmail)
                            .input('userPassword', sql.NVarChar(sql.MAX), hash)
                            .output('responseMessage', sql.VarChar(50))
                            .execute('spSignupUser', function (err, data) {
                        if (err) {
                           return h.code(500).json({
                                error: {
                                    message: err
                               }
                           });
                        }
                        else {
                            console.log("data",data);
                            if (data['output']['responseMessage'] == 'Failed') {
                            //    return h.response({ result, id_token: createToken(usercreated) }).code(200);
                                return h.response('user exist').code(200);
                            }
                            else {
                              return h.response({Name:userName,Email:userEmail})
                                    
                            }
                        }
                     });
                    }
                });
            }
            else {
                return h.response("Not Found").code(404)
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
        handler: async (req, h) => {
            try {
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
                                                return h.response({message:err}).code(500)
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
                                                console.log("results", results);
                                                console.log("datas", datas)
                                                console.log("accesstoken",token)
                                                return h.response({ 
                                                   message:'success',
                                                    userdata: datas['recordset'],
                                                    access_token: token}).code(201)
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
            catch (error) {
                return h.response(error).code(500)
            }
        }
    },
    {
        method: 'GET',
        path: '/getusers/{userId?}',
        config: {
            handler: async(req, h)=> {
                // const query = promisify(db.query);
                var userId = req.params.userId
                console.log('userId',userId)
                 const result = await getpool();
                   result .input("params", sql.Int, userId)
                    .query(`select * from signupUser where userId = @params`)
                    .then(function (dbData) {
                        if (dbData == null || dbData.length === 0)
                            return;
                        console.dir(`User with Code ${userId}`);
                        console.dir(dbData);
                    })
                    .catch(function (error) {
                        console.dir(error);
                    });
            }
        }
    },
    {
        method: 'POST',
        path: '/update/{userId?}',
        config: {
            handler: async (req, h) => {
                const userEmail = req.payload.userEmail
                const salt = await bcrypt.genSalt(10);
                const userPassword = await bcrypt.hash(req.payload.userPassword, salt);
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
            }
        }
    }
    
]
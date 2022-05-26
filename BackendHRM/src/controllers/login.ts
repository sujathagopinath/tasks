import { Request, ResponseToolkit } from "@hapi/hapi";
import { ILoginRequest } from '../interfaces/index';
import { redis } from "../server";
import { dbConfig } from "../config/settings";
const sql = require("mssql");
const db = require("../database");
const Boom = require("@hapi/boom");
const bcrypt = require("bcryptjs");
const Jwt = require('jsonwebtoken')


async function getpool() {
    const pool = await db.poolPromise;
    const result = await pool.request();
    return result;
}

const loginCust = async (request: ILoginRequest, h: ResponseToolkit) => {
    const custEmail = request.payload.custEmail;
    const custPassword = request.payload.custPassword;
    try {
        const result = await getpool();
        const somevar = new Promise(async (resolve, reject) => {
            await result
                .input("custEmail", sql.NVarChar(50), custEmail)
                .input("custPassword", sql.NVarChar(sql.MAX), custPassword)
                .output("responseMessage", sql.VarChar(50))
                .execute("spcustlogin", (err: any, data: any) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        result
                            .query(
                                "Select * from Customers where custEmail=" +
                                "'" +
                                request.payload.custEmail +
                                "'"
                            )
                            .then(function (datas: any) {
                                bcrypt.compare(
                                    request.payload.custPassword,
                                    datas["recordset"][0]["custPassword"]
                                );

                                const accesstoken = Jwt.sign(
                                    {
                                        custId: datas["recordset"][0]["custId"],
                                        email: datas["recordset"][0]["custEmail"],
                                    },
                                    dbConfig._instance.jwt.jwt_key,
                                    {
                                        expiresIn: "1h",
                                    }
                                );
                                const response = h.response({
                                    datas,
                                    accesstoken
                                });
                                var logindata = JSON.stringify(datas);
                                redis.set('custdata', logindata)
                                resolve(response);
                            })
                            .catch((err: any) => {
                                console.log(err);
                            });
                    }
                });
        });
        return somevar;
    } catch (error) {
        throw Boom.serverUnavailable(error);
    }
};



module.exports = { loginCust };

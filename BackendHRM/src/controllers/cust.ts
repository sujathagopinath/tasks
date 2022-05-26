import { Request, ResponseToolkit } from "@hapi/hapi";
import { IAuthRequest } from "../interfaces";
const Boom = require("@hapi/boom");
const db = require("../database");
const sql = require("mssql");
const bcrypt = require("bcryptjs");

async function getpool() {
    const pool = await db.poolPromise;
    const result = await pool.request();
    return result;
}

const getcustdata = async (request: IAuthRequest, h: ResponseToolkit) => {
    try {
        const custId = request.pre.decoded;
        const custName = request.query.custName;
        const custEmail = request.query.custEmail;

        const result = await getpool();
        const getusers = new Promise(async (resolve, reject) => {
            await result
                .input("custId", sql.Int, custId)
                .input("custName", sql.NVarChar(50), custName)
                .input("custEmail", sql.NVarChar(50), custEmail)
                .output("responseMessage", sql.VarChar(50))
                .execute("spgetcustdatas", (err: any, data: any) => {
                    if (err) {
                        reject(err)
                    } else {
                        const response = h.response(data);
                        resolve(response);
                    }
                });
        });
        return getusers;
    } catch (error) {
        throw Boom.serverUnavailable(error);
    }
};

module.exports = { getcustdata }
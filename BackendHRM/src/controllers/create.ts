import { Request, ResponseToolkit } from "@hapi/hapi";
import { ILoginRequest } from '../interfaces/index';
import { redis } from "../server";
import { schema } from "../validation/index"
const sql = require("mssql");
const db = require("../database");
const Boom = require("@hapi/boom");
const bcrypt = require("bcryptjs");

async function getpool() {
    const pool = await db.poolPromise;
    const result = await pool.request();
    return result;
}

const registerCust = async (request: ILoginRequest, h: ResponseToolkit) => {
    var custName = request.payload.custName;
    var custEmail = request.payload.custEmail;
    var custPassword = request.payload.custPassword;
    var collections = request.payload.collections

    try {
        const { value, error } = schema.validate(request.payload, {
            abortEarly: false,
        });
        if (error) {
            return h.response(error.details).code(400);
        }

        const hashPassword = await bcrypt.hash(custPassword, 10);
        const result = await getpool();
        const somevar: any = new Promise(async (resolve, reject) => {
            await result
                .input("custName", sql.VarChar(50), custName)
                .input("custEmail", sql.NVarChar(50), custEmail)
                .input("custPassword", sql.NVarChar(sql.MAX), hashPassword)
                .input("collections", sql.NVarChar(50), collections)
                .output("responseMessage", sql.VarChar(50))
                .execute("spsignupcustomers", (err: any, data: any) => {
                    if (err) {
                        reject(err)
                    } else {

                        const response = h.response(data);
                        var datas = JSON.stringify(data);
                        redis.set('custdata', datas)
                        resolve(response);
                    }
                });

        });
        return somevar;
    } catch (error) {
        throw Boom.serverUnavailable(error);
    }

}


module.exports = { registerCust };
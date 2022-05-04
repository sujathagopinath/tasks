import { Request, ResponseToolkit } from "@hapi/hapi";
const sql = require("mssql");
const db = require("../../Config/db");
import { ILoginRequest } from '../../interfaces/index'
const Boom = require("@hapi/boom");


async function getpool() {
    const pool = await db.poolPromise;
    const result = await pool.request();
    return result;
}
const sample = async (request: Request, h: ResponseToolkit) => {
    return 'Testing'
}

const addEmp = async (request: ILoginRequest, h: ResponseToolkit) => {
    var empname = request.payload.empname;
    var designation = request.payload.designation;
    var age = request.payload.age
    try {
        const result = await getpool();
        const somevar: any = new Promise(async (resolve, reject) => {
            await result
                .input("empname", sql.VarChar(50), empname)
                .input("designation", sql.VarChar(50), designation)
                .input("age", sql.Int, age)
                .output("responseMessage", sql.VarChar(50))
                .execute("spaddEmployee", (err: any, data: any) => {
                    if (err) {
                        reject(err);
                    } else {
                        const response = h.response(data);
                        resolve(response);
                    }
                });

        });
        return somevar;
    } catch (error) {
        throw Boom.serverUnavailable(error);
    }
}

module.exports = { sample, addEmp };
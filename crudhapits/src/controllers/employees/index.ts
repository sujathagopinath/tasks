import { Request, ResponseToolkit } from "@hapi/hapi";
const sql = require("mssql");
const db = require("../../database");
import { AddRequest, ILoginRequest } from '../../interfaces/index'
const Boom = require("@hapi/boom");
const jwt = require('jsonwebtoken')


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
            jwt.sign()
        });
        return somevar;
    } catch (error) {
        throw Boom.serverUnavailable(error);
    }

}

// const adduser = async (request: AddRequest, h: ResponseToolkit) => {
//     var name = request.payload.name;
//     var email = request.payload.email
//     try {
//         await request.redis.set({
//             account: { email, name }
//         });
//         return 'success'
//     }
//     catch (error) {
//         throw Boom.serverUnavailable(error)
//     }
// }
module.exports = { sample, addEmp };
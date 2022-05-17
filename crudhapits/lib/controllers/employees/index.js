"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const sql = require("mssql");
const db = require("../../database");
const Boom = require("@hapi/boom");
function getpool() {
    return __awaiter(this, void 0, void 0, function* () {
        const pool = yield db.poolPromise;
        const result = yield pool.request();
        return result;
    });
}
const sample = (request, h) => __awaiter(void 0, void 0, void 0, function* () {
    return 'Testing';
});
const addEmp = (request, h) => __awaiter(void 0, void 0, void 0, function* () {
    var empname = request.payload.empname;
    var designation = request.payload.designation;
    var age = request.payload.age;
    try {
        const result = yield getpool();
        const somevar = new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
            yield result
                .input("empname", sql.VarChar(50), empname)
                .input("designation", sql.VarChar(50), designation)
                .input("age", sql.Int, age)
                .output("responseMessage", sql.VarChar(50))
                .execute("spaddEmployee", (err, data) => {
                if (err) {
                    reject(err);
                }
                else {
                    const response = h.response(data);
                    resolve(response);
                }
            });
        }));
        return somevar;
    }
    catch (error) {
        throw Boom.serverUnavailable(error);
    }
});
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

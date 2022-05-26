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
const server_1 = require("../server");
const index_1 = require("../validation/index");
const sql = require("mssql");
const db = require("../database");
const Boom = require("@hapi/boom");
const bcrypt = require("bcryptjs");
function getpool() {
    return __awaiter(this, void 0, void 0, function* () {
        const pool = yield db.poolPromise;
        const result = yield pool.request();
        return result;
    });
}
const registerCust = (request, h) => __awaiter(void 0, void 0, void 0, function* () {
    var custName = request.payload.custName;
    var custEmail = request.payload.custEmail;
    var custPassword = request.payload.custPassword;
    var collections = request.payload.collections;
    try {
        const { value, error } = index_1.schema.validate(request.payload, {
            abortEarly: false,
        });
        if (error) {
            return h.response(error.details).code(400);
        }
        const hashPassword = yield bcrypt.hash(custPassword, 10);
        const result = yield getpool();
        const somevar = new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
            yield result
                .input("custName", sql.VarChar(50), custName)
                .input("custEmail", sql.NVarChar(50), custEmail)
                .input("custPassword", sql.NVarChar(sql.MAX), hashPassword)
                .input("collections", sql.NVarChar(50), collections)
                .output("responseMessage", sql.VarChar(50))
                .execute("spsignupcustomers", (err, data) => {
                if (err) {
                    console.log(err);
                }
                else {
                    const response = h.response(data);
                    var datas = JSON.stringify(data);
                    server_1.redis.set('custdata', datas);
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
module.exports = { registerCust };

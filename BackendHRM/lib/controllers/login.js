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
const settings_1 = require("../config/settings");
const sql = require("mssql");
const db = require("../database");
const Boom = require("@hapi/boom");
const bcrypt = require("bcryptjs");
const Jwt = require('jsonwebtoken');
function getpool() {
    return __awaiter(this, void 0, void 0, function* () {
        const pool = yield db.poolPromise;
        const result = yield pool.request();
        return result;
    });
}
const loginCust = (request, h) => __awaiter(void 0, void 0, void 0, function* () {
    const custEmail = request.payload.custEmail;
    const custPassword = request.payload.custPassword;
    try {
        const result = yield getpool();
        const somevar = new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
            yield result
                .input("custEmail", sql.NVarChar(50), custEmail)
                .input("custPassword", sql.NVarChar(sql.MAX), custPassword)
                .output("responseMessage", sql.VarChar(50))
                .execute("spcustlogin", (err, data) => {
                if (err) {
                    reject(err);
                }
                else {
                    result
                        .query("Select * from Customers where custEmail=" +
                        "'" +
                        request.payload.custEmail +
                        "'")
                        .then(function (datas) {
                        bcrypt.compare(request.payload.custPassword, datas["recordset"][0]["custPassword"]);
                        const accesstoken = Jwt.sign({
                            custId: datas["recordset"][0]["custId"],
                            email: datas["recordset"][0]["custEmail"],
                        }, settings_1.dbConfig._instance.jwt.jwt_key, {
                            expiresIn: "1h",
                        });
                        const response = h.response({
                            datas,
                            accesstoken
                        });
                        var logindata = JSON.stringify(datas);
                        server_1.redis.set('custdata', logindata);
                        resolve(response);
                    })
                        .catch((err) => {
                        console.log(err);
                    });
                }
            });
        }));
        return somevar;
    }
    catch (error) {
        throw Boom.serverUnavailable(error);
    }
});
module.exports = { loginCust };

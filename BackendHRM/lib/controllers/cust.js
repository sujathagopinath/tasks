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
const Boom = require("@hapi/boom");
const db = require("../database");
const sql = require("mssql");
const bcrypt = require("bcryptjs");
function getpool() {
    return __awaiter(this, void 0, void 0, function* () {
        const pool = yield db.poolPromise;
        const result = yield pool.request();
        return result;
    });
}
const getcustdata = (request, h) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const custId = request.pre.decoded;
        const custName = request.query.custName;
        const custEmail = request.query.custEmail;
        const result = yield getpool();
        const getusers = new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
            yield result
                .input("custId", sql.Int, custId)
                .input("custName", sql.NVarChar(50), custName)
                .input("custEmail", sql.NVarChar(50), custEmail)
                .output("responseMessage", sql.VarChar(50))
                .execute("spgetcustdatas", (err, data) => {
                if (err) {
                    reject(err);
                }
                else {
                    const response = h.response(data);
                    resolve(response);
                }
            });
        }));
        return getusers;
    }
    catch (error) {
        throw Boom.serverUnavailable(error);
    }
});
module.exports = { getcustdata };

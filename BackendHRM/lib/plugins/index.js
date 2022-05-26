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
const { registerCust } = require('../controllers/create');
const { loginCust } = require('../controllers/login');
const { getcustdata } = require('../controllers/cust');
const { tokenMiddleware } = require('../controllers/middleware');
exports.plugin = {
    name: 'custPlugin',
    register: (server, option) => __awaiter(void 0, void 0, void 0, function* () {
        server.route([
            {
                method: "POST",
                path: "/create",
                handler: registerCust,
                options: {
                    auth: false
                }
            },
            {
                method: "POST",
                path: "/login",
                handler: loginCust,
                options: {
                    auth: false
                }
            },
            {
                method: "GET",
                path: "/getdata",
                options: {
                    handler: getcustdata,
                    pre: [
                        { method: tokenMiddleware }
                    ]
                }
            },
        ]);
    })
};

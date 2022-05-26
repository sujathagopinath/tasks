"use strict";
const { registerCust } = require('../controllers/create');
const { loginCust } = require('../controllers/login');
module.exports = [
    {
        method: "POST",
        path: "/create",
        handler: registerCust,
    },
    {
        method: "POST",
        path: "/login",
        handler: loginCust,
    },
];

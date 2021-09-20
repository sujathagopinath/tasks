'use strict';

const jwt = require('jsonwebtoken');
const secret = require('../config');

function createToken(user) {
    return jwt.sign
        (
            { id: user._id, username: user.username },
            secret,
            { expiresIn: "1h" }
        );
}

module.exports = createToken;
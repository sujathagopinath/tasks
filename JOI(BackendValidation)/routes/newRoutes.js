const express = require('express');
// const joi = require('joi')
const New = require('../models/New');
const middleware = require('../middleware')
const NewRouter = express.Router();

NewRouter.post('/newpost', middleware(New.newTry, (req, res) => {
    res.json(req.body)

}))
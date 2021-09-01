const express = require('express');
const asyncHandler = require('express-async-handler');
const authMiddlware = require('../middlewares/authMiddleware');
const User = require('../models/User');
const authTokenGenerator = require('../utils/authTokenGenerator');
const userRouter = express.Router();
const bcrypt = require('bcryptjs');

//Create user
userRouter.post(
  '/',
  asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const userExist = await User.findOne({ email: email })
    if (userExist) {
      res.status(400)
      throw new Error('User Exist');
    }
    const userCreated = await User.create({ name, email, password });
    // res.send(userCreated);
    if (userCreated) {
      res.status(200);
      res.json({
        _id: userCreated._id,
        name: userCreated.name,
        email: userCreated.email,
        token: authTokenGenerator(userCreated._id),
      });
    }
  })
);

userRouter.post(
  '/login',
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    //Compare password
    if (user && (await user.isPasswordMatch(password))) {
      req.session.user = user;
      console.log("req.sessionid", req.session.id)
      res.status(200);
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: authTokenGenerator(user._id),
      });
    }
    else {
      res.status(401);
      throw new Error('Invalid login credentials');
    }
  })
);

//GET PROFILE

userRouter.get(
  '/profile',
  authMiddlware,
  asyncHandler(async (req, res) => {
    try {
      // console.log('query', req.query);
      await User.findOne({ _id: req.query.id }).populate('books')
        .then(user => {
          if (user) {
            console.log('user', user);
            res.status(200);
            res.send(user);
          }
          else {
            res.status(404);
            res.send('You dont have profile yet');
          }
        })
    } catch (error) {
      res.status(500).send("something went wrong");
    }
  })
);


//UPDATE PROFILE

userRouter.put(
  '/profile/update',
  authMiddlware,
  asyncHandler(async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash(req.body.password, salt);
      // console.log(password);
      await User.findByIdAndUpdate(req.body.id,
        {
          name: req.body.name,
          email: req.body.email,
          password: password,
        },
        (error, data) => {
          console.log("data", data)
          if (data == null) {
            res.status(404);
            res.send('User profile not found');
          }
          else {
            res.status(200);
            res.send('User profile updated successfully');
          }
        })
    } catch (error) {
      res.status(500).send("Something went wrong")
    }
  })
);


//Fetch all Users

userRouter.get(
  '/',
  authMiddlware,
  asyncHandler(async (req, res) => {
    try {
      await User.find().populate('books')
        .then(user => {
          if (user) {
            res.status(200);
            res.json(user);
          }
          else {
            res.status(404);
            res.send("No user found");
          }
        })
    } catch (error) {
      res.status(500).send('Something went wrong')
    }
  })
);

module.exports = { userRouter };

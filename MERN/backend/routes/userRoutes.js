const express = require('express');
const asyncHandler = require('express-async-handler');
const authMiddlware = require('../middlewares/authMiddleware');
const User = require('../models/User');
const authTokenGenerator = require('../utils/authTokenGenerator');
const userRouter = express.Router();

//Create user
userRouter.post(
  '/',
  asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      throw new Error('User Exist');
    }
    const userCreated = await User.create({ name, email, password });
    res.send(userCreated);
    if (userCreated) {
      res.status(200);
      res.json({
        _id: userCreated._id,
        name: userCreated.name,
        email: userCreated.email,
        password: userCreated.password,
        token: authTokenGenerator(userCreated._id),
      });
    }
    res.status(500);
    throw new Error('Server Error');
  })
);

userRouter.post(
  '/login',
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    //Compare password
    if (user && (await user.isPasswordMatch(password))) {
      res.status(201);
      res.status(200);
      res.json({
        _id: user._id,
        name: user.name,
        password: user.password,
        email: user.email,
        token: authTokenGenerator(user._id),
      });
    } else {
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
      const user = await User.findById(req.user.id).populate('books');
      res.status(404);
      if (!user) throw new Error(`You don't have any profile yet`);
      res.status(201);
      res.send(user);
    } catch (error) {
      res.status(500);
      throw new Error('Server error');
    }
  })
);

//UPDATE PROFILE

userRouter.put(
  '/profile/update',
  authMiddlware,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      //This will encrypt automatically in our model
      if (req.body.password) {
        user.password = req.body.password || user.password;
      }
      const updateUser = await user.save();
      res.json({
        _id: updateUser._id,
        name: updateUser.name,
        password: updateUser.password,
        email: updateUser.email,
        token: authTokenGenerator(updateUser._id),
      });
    } else {
      res.status(401);
      throw new Error('User Not found');
    }
  })
);

//Fetch all Users

userRouter.get(
  '/',
  authMiddlware,
  asyncHandler(async (req, res) => {
    try {
      const users = await User.find().populate('books');
      res.status(200);
      res.json(users);
    } catch (error) {
      res.status(404);
      throw new Error('Relogin the Page');
    }
  })
);

module.exports = { userRouter };
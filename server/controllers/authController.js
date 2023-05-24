import express from 'express';
import User from '../mongoDB/models/userSchema.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createError } from '../utils/createError.js';
export const register = async (req, res, next) => {
  try {
    const hashPassword = bcrypt.hashSync(req.body.password, 10);
    const user = new User({
      ...req.body,
      password: hashPassword,
    });
    await user.save();
    res.status(201).send('user has been registered');
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { username } = req.body;
    const user = await User.findOne({ username });
    if (!user) return next(createError(401, 'user not found'));

    const isCorrect = bcrypt.compareSync(req.body.password, user.password);
    if (!isCorrect) return next(createError(400, 'wrong user or password'));

    const token = jwt.sign(
      {
        id: user?._id,
        isSeller: user?.isSeller,
      },
      process.env.JWT_KEY,
      {
        expiresIn: '10m',
      }
    );

    const { password, ...info } = user?._doc;
    res.cookie('accessToken', token, { httpOnly: true }).status(200).send(info);
  } catch (error) {
    next(error);
  }
};
export const logout = (req, res) => {
  res
    .clearCookie('accessToken', {
      sameSite: 'none',
      secure: true,
    })
    .status(200)
    .send('user has been logged out'); 
};

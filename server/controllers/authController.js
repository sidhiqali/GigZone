import express from 'express';
import User from '../mongoDB/models/userSchema.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
export const register = async (req, res) => {
  try {
    const hashPassword = bcrypt.hashSync(req.body.password, 10);
    const user = new User({
      ...req.body,
      password: hashPassword,
    });
    await user.save();
    res.status(201).send('user has been registered');
  } catch (error) {
    console.log(error.message);
    console.log('some error happened');
  }
};

export const login = async (req, res) => {
  try {
    const { username } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(404).send('user not found');

    const isCorrect = bcrypt.compareSync(req.body.password, user.password);
    if (!isCorrect) return res.status(400).send('wrong username or password');

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
    console.log(error);
  }
};
export const logout = (req, res) => {};

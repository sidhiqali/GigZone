import express from 'express';
import User from '../mongoDB/models/userSchema.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createError } from '../utils/createError.js';
export const register = async (req, res, next) => {
  try {
    const { username, password, email, country } = req.body;
    if (!password || !email || !country || !username) {
      return next(createError(400, 'Please fill all columns'));
    }

    // Password validation
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
      return next(
        createError(
          400,
          'Password must be at least 8 characters long and include at least one letter and one number'
        )
      );
    }

    const hashPassword = bcrypt.hashSync(password, 10);

    const user = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (user) {
      if (user.username === username) {
        return next(createError(400, 'Username already exists'));
      }
      if (user.email === email) {
        return next(createError(400, 'Email already exists'));
      }
    }

    const newUser = await User.create({
      ...req.body,
      password: hashPassword,
    });
    const token = jwt.sign(
      {
        id: newUser._id,
        isSeller: newUser.isSeller,
      },
      process.env.JWT_KEY
    );

    const { password: _, ...info } = newUser._doc;
    res
      .cookie('accessToken', token, {
        sameSite: 'none',
        secure: true,
        expiresIn: '10d',
      })
      .status(201)
      .send({ info, token });
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
      process.env.JWT_KEY
    );

    const { password, ...info } = user?._doc;
    res
      .cookie('accessToken', token, {
        sameSite: 'none',
        secure: true,
        expiresIn: '10d',
      })
      .status(200)
      .send(info);
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

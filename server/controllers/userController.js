import User from '../mongoDB/models/userSchema.js';
import { createError } from '../utils/createError.js';
export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return next(createError(403, 'user not exist'));
    if (req.userId !== user._id.toString()) {
      return next(createError(403, 'you can only delete your account'));
    }
    await User.findByIdAndDelete(req.params.id);
    res.status(200).send('deleted successfully');
  } catch (error) {
    next(error);
  }
};
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return next(createError(403, 'user not exist'));
    res.status(200).send(user);
  } catch (error) {
    next(error);
  }
};
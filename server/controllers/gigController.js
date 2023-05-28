import { createError } from '../utils/createError.js';
import Gig from '../mongoDB/models/gigSchema.js';

export const createGig = async (req, res, next) => {
  if (!req.isSeller)
    return next(createError(403, 'only seller can create gig'));
  try {
    const gig = await Gig.create({ userId: req.userId, ...req.body });
    res.status(200).send(gig);
  } catch (error) {
    next(error);
  }
};
export const deleteGig = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.id);
    if (gig.userId.toString() !== req.userId.toString())
      return next(createError(403, 'only user can delete gig'));
    await Gig.findByIdAndDelete(req.params.id);
    res.status(200).send('deleted successfully');
  } catch (error) {
    next(error);
  }
};
export const showGig = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.id);
    if (!gig) return next(createError(404, 'gig not found'));
    res.status(200).send(gig);
  } catch (error) {}
};
export const showGigs = async (req, res, next) => {
  try {
    const q = req.query;
    const filters = {
      ...(q.userId && { userId: q.userId }),
      ...(q.category && { category: q.category }),
      ...((q.min || q.max) && {
        price: { ...(q.min && { $gt: q.min }), ...(q.max && { $lt: q.max }) },
      }),
      ...(q.search && { title: { $regex: q.search, $options: 'i' } }),
    };

    const gigs = await Gig.find(filters);
    if (!gigs) return next(createError(404, 'no gigs found'));
    res.status(200).send(gigs);
  } catch (error) {
    next(error);
  }
};

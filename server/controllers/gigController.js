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
  const q = req.query;
  let filters = {};

  if (Object.keys(q).length > 0) {
    filters = {
      ...(q.userId && { userId: q.userId }),
      ...(q.searchGig && { title: q.searchGig }),
      ...(q.category && { category: q.category }),
      ...(q.min || q.max
        ? {
            price: {
              ...(q.min && { $gte: parseFloat(q.min) }),
              ...(q.max && { $lte: parseFloat(q.max) }),
            },
          }
        : {}),
      ...(q.search && {
        title: { $regex: escapeRegExp(q.search), $options: 'i' },
      }),
    };
  }

  try {
    const gigs = await Gig.find(filters).sort({ [q.sort]: -1 });
    res.status(200).send(gigs);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
export const updateGig = async (req, res, next) => {
  try {
    const gigId = req.params.id;
    const updatedFields = req.body;

    const gig = await Gig.findById(gigId);
    if (!gig) {
      return next(createError(404, 'Gig not found'));
    }
    if (req.userId.toString() !== gig.userId.toString()) {
      return next(
        createError(403, 'Only the user who created the gig can update it')
      );
    }

    Object.assign(gig, updatedFields);

    const updatedGig = await gig.save();
    res.status(200).send(updatedGig);
  } catch (error) {
    console.error('Error updating gig:', error);
    next(error);
  }
};

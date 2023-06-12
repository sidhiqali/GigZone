import { createError } from '../utils/createError.js';
import Review from '../mongoDB/models/reviewSchema.js';
import Gig from '../mongoDB/models/gigSchema.js';

//@desc create a new review
//@route POST /api/review/
//@access private

export const createReview = async (req, res, next) => {
  if (req.isSeller)
    return next(createError(403, 'seller cannot create a review'));
  try {
    const review = await Review.findOne({
      gigId: req.body.gigId,
      userId: req.userId,
    });
    if (review)
      return next(createError(403, 'cannot submit review twice for same gig'));

    const newReview = await Review.create({
      gigId: req.body.gigId,
      userId: req.userId,
      desc: req.body.desc,
      star: req.body.star,
    });

    await Gig.findByIdAndUpdate(req.body.gigId, {
      $inc: { totalStars: req.body.star, starNumber: 1 },
    });
    res.status(201).send(newReview);
  } catch (error) {
    next(error);
  }
};

//@desc get all reviews
//@route GET /api/review/
//@access private

export const getReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ gigId: req.params.gigId });
    res.status(200).send(reviews);
  } catch (error) {
    next(error);
  }
};

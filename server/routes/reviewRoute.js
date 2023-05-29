import express from 'express';
import { verifyToken } from '../middleware/jwt.js';
import {
  createReview,
  deleteReview,
  getReviews,
} from '../controllers/reviewController.js';
const router = express.Router();

router.post('/', verifyToken, createReview);
router.get('/:gigId', getReviews);
router.post('/:id', verifyToken, deleteReview);

export default router;

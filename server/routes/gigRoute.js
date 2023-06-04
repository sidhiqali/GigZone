import express from 'express';
import { verifyToken } from '../middleware/jwt.js';
const router = express.Router();
import {
  createGig,
  deleteGig,
  showGig,
  showGigs,
  updateGig,
} from '../controllers/gigController.js';

router.post('/', verifyToken, createGig);
router.delete('/:id', verifyToken, deleteGig);
router.get('/single/:id', showGig);
router.get('/', showGigs);
router.put('/:id', verifyToken, updateGig);

export default router;

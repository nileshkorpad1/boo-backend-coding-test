import express from 'express';
import { getAllComments, createComment } from '../controllers/commentController';

const router = express.Router();

router.get('/', getAllComments);
router.post('/', createComment);

export default router;

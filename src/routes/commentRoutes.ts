import express from 'express';
import {
  getAllComments,
  createComment,
  getCommentById,
  updateComment,
  deleteComment
} from '../controllers/commentController';

const router = express.Router();

router.get('/', getAllComments);
router.post('/', createComment);
router.get('/:id', getCommentById); // New route to get comment by ID
router.put('/:id', updateComment);
router.delete('/:id', deleteComment);

export default router;

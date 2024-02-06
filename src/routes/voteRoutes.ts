import express from 'express';
import { voteOnComment } from '../controllers/voteController';

const router = express.Router();

router.post('/:commentId', voteOnComment);

export default router;

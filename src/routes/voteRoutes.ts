import express from 'express';
import * as voteController from '../controllers/voteController';

const router = express.Router();

// POST /api/votes - Submit a vote
router.post('/', voteController.submitVote);

export default router;

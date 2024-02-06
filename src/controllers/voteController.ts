import { Request, Response } from 'express';
import Vote from '../models/voteModel';

export const voteOnComment = async (req: Request, res: Response) => {
  try {
    const { commentId } = req.params;
    const { mbti, enneagram, zodiac } = req.body;
    const vote = await Vote.create({ commentId, mbti, enneagram, zodiac });
    res.status(201).json(vote);
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
};

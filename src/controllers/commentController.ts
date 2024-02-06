import { Request, Response } from 'express';
import Comment from '../models/commentModel';

export const getAllComments = async (req: Request, res: Response) => {
  try {
    const comments = await Comment.find();
    res.json(comments);
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
};

export const createComment = async (req: Request, res: Response) => {
  try {
    const { content } = req.body;
    const comment = await Comment.create({ content });
    res.status(201).json(comment);
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
};

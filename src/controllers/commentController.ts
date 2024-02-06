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

export const getCommentById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findById(id);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    res.json(comment);
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateComment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const updatedComment = await Comment.findByIdAndUpdate(id, { content }, { new: true });
    if (!updatedComment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    res.json(updatedComment);
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedComment = await Comment.findByIdAndDelete(id);
    if (!deletedComment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    res.json({ message: 'Comment deleted successfully' });
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
};

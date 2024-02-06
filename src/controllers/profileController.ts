import { Request, Response } from 'express';
import Profile from '../models/profileModel';

export const getAllProfiles = async (req: Request, res: Response) => {
  try {
    const profiles = await Profile.find();
    res.json(profiles);
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
};

export const createProfile = async (req: Request, res: Response) => {
  try {
    const { imageUrl, name, phone, email, description } = req.body;
    const profile = await Profile.create({ imageUrl, name, phone, email, description });
    res.status(201).json(profile);
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
};

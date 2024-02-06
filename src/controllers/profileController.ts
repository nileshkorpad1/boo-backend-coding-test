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

export const getProfileById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const profile = await Profile.findById(id);
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.json(profile);
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { imageUrl, name, phone, email, description } = req.body;
    const updatedProfile = await Profile.findByIdAndUpdate(id, { imageUrl, name, phone, email, description }, { new: true });
    if (!updatedProfile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.json(updatedProfile);
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProfile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedProfile = await Profile.findByIdAndDelete(id);
    if (!deletedProfile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.json({ message: 'Profile deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

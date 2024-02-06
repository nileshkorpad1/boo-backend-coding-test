import { Request, Response } from 'express';
import Vote from '../models/voteModel';
import Profile from '../models/profileModel'; // Import the Profile model

export const submitVote = async (req: Request, res: Response) => {
    try {
        const { profileId, personalitySystem, personalityType } = req.body;

        // Check if the profile exists
        const profileExists = await Profile.exists({ _id: profileId });
        if (!profileExists) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        // Create and save the vote
        const vote = new Vote({
            profileId,
            personalitySystem,
            personalityType,
        });

        await vote.save();
        res.status(201).json({ message: 'Vote submitted successfully' });
    } catch (error:any) {
        res.status(500).json({ message: error.message });
    }
};

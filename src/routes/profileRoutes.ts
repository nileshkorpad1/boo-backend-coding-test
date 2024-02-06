import express from 'express';
import {
  getAllProfiles,
  createProfile,
  getProfileById,
  updateProfile,
  deleteProfile
} from '../controllers/profileController';

const router = express.Router();

router.get('/', getAllProfiles);
router.post('/', createProfile);
router.get('/:id', getProfileById); // New route to get profile by ID
router.put('/:id', updateProfile);
router.delete('/:id', deleteProfile);

export default router;

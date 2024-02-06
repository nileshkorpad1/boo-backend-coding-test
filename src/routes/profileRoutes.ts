import express from 'express';
import { getAllProfiles, createProfile } from '../controllers/profileController';

const router = express.Router();

router.get('/', getAllProfiles);
router.post('/', createProfile);

export default router;

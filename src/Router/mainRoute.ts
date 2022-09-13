import express from 'express';
import auth from './auth';
import buyer from './buyer';
import seller from './seller';

const router = express.Router();

router.use('/auth', auth); //route for auth module
router.use('/buyer', buyer); //route for buyer module
router.use('/seller', seller); //route for seller module
export default router;

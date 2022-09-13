import express from 'express';
import { login, register } from '../Controller/auth/index';
import { validateLoginRequest, validateRegisterRequest } from '../Validation/auth';

const router = express.Router();

router.post('/login', validateLoginRequest, login);
router.post('/register', validateRegisterRequest, register);

export default router;

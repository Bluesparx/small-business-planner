import express from 'express';
import { userLogin, userSignUp, getUser } from '../controller/user.js';

const router = express.Router();

router.post('/signUp', userSignUp);
router.post('/login', userLogin);
router.get('/user/:id', getUser);

export default router;
import express from 'express';
import { protect } from '../middleware/authMiddleware.js'; 
import { handleAnswer } from '../controller/qnaController.js';

const qna = express.Router();

qna.post('/ask', protect, handleAnswer);

export default qna;

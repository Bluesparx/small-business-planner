import express from 'express';
import { triggerUserAnalysis, getUserAnalysis } from '../controller/dataAnalyticsController.js';
import { protect } from "../middleware/authMiddleware.js"; 

const dataAnalyticsRouter = express.Router();

dataAnalyticsRouter.post('/trigger-analysis', protect, triggerUserAnalysis);
dataAnalyticsRouter.get('/user-analysis', protect, getUserAnalysis);

export default dataAnalyticsRouter;

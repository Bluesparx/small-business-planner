import express from 'express';
import { triggerUserAnalysis, getUserAnalysis } from '../controller/dataAnalyticsController.js';

const dataAnalyticsRouter = express.Router();

dataAnalyticsRouter.post('/trigger-analysis', triggerUserAnalysis);
dataAnalyticsRouter.get('/user-analysis/:userId', getUserAnalysis);

export default dataAnalyticsRouter;

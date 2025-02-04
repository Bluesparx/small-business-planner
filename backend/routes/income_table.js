import { createIncomeTable,getAllIncomeTables,getIncomeTableById, getIncomeByUserId} from '../controller/income_table.js';
import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
const incomeRouter = express.Router();

incomeRouter.post('/table', protect, createIncomeTable);
incomeRouter.get('/table', protect, getAllIncomeTables);
incomeRouter.get('/table/:id', protect, getIncomeTableById);
incomeRouter.get('/get-table', protect, getIncomeByUserId)

export default incomeRouter;
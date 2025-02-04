import express from 'express';
import { createBalanceSheetTable, getAllBalanceSheetTables, getBalanceByUserId, getBalanceSheetTableById } from '../controller/balanceSheetTable.js';
import { protect } from "../middleware/authMiddleware.js"; 

const balanceSheetRouter = express.Router();

balanceSheetRouter.post('/table',protect, createBalanceSheetTable );
balanceSheetRouter.get('/table', protect, getAllBalanceSheetTables);
balanceSheetRouter.get('/table/:id', protect, getBalanceSheetTableById);
balanceSheetRouter.get('/get-table', protect, getBalanceByUserId);

export default balanceSheetRouter;
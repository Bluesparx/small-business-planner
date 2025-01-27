import express from 'express';
import { createBalanceSheetTable, getAllBalanceSheetTables, getBalanceSheetTableById } from '../controller/balanceSheetTable.js';
import { protect } from "../middleware/authMiddleware.js"; 

const balanceSheetRouter = express.Router();

balanceSheetRouter.post('/table',protect, createBalanceSheetTable );
balanceSheetRouter.get('/table', protect, getAllBalanceSheetTables);
balanceSheetRouter.get('/table/:id', protect, getBalanceSheetTableById);

export default balanceSheetRouter;
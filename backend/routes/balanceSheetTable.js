import express from 'express';
import { createBalanceSheetTable, getAllBalanceSheetTables, getBalanceSheetTableById } from '../controller/balanceSheetTable.js';

const balanceSheetRouter = express.Router();

balanceSheetRouter.post('/table',createBalanceSheetTable );
balanceSheetRouter.get('/table', getAllBalanceSheetTables);
balanceSheetRouter.get('/table/:id', getBalanceSheetTableById);

export default balanceSheetRouter;
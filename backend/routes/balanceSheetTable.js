import express from 'express';
import { createBalanceSheetTable, getAllBalanceSheetTables, getBalanceSheetTableById } from '../controller/balanceSheetTable.js';

const balanceSheetRouter = express.Router();

balanceSheetRouter.post('/balance-sheet/table',createBalanceSheetTable );
balanceSheetRouter.get('/balance-sheet/table', getAllBalanceSheetTables);
balanceSheetRouter.get('/balance-sheet/table/:id', getBalanceSheetTableById);

export default balanceSheetRouter;
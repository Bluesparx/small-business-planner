import { createIncomeTable,getAllIncomeTables,getIncomeTableById} from '../controller/income_table.js';
import express from 'express';
const incomeRouter = express.Router();

incomeRouter.post('/table',createIncomeTable);
incomeRouter.get('/table', getAllIncomeTables);
incomeRouter.get('/table/:id', getIncomeTableById);

export default incomeRouter;
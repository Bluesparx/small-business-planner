import { createIncomeTable,getAllIncomeTables,getIncomeTableById} from '../controller/income_table.js';
import express from 'express';
const incomeRouter = express.Router();

incomeRouter.post('/income/table',createIncomeTable);
incomeRouter.get('/income/table', getAllIncomeTables);
incomeRouter.get('/income/table/:id', getIncomeTableById);

export default incomeRouter;
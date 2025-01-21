import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import connectDb from './config/connectionDb.js';
import router from './routes/user.js'; // Correctly import user router
import balanceSheetRouter from './routes/balanceSheetTable.js'; // Correctly import BalanceSheet router
import incomeRouter from './routes/income_table.js';
import dataAnalyticsRouter from './routes/dataAnalyticsRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to database
connectDb();

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

// Use the routers
app.use('/api/users', router);
app.use('/api/balance-sheet', balanceSheetRouter);
app.use('/api/income', incomeRouter);
app.use('/api/data', dataAnalyticsRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

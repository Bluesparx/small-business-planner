import mongoose from 'mongoose';

const incomerowSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  revenue: {
    type: Number,
    required: true,
  },
  costOfRevenue: {
    type: Number,
    required: true,
  },
  operatingIncome: {
    type: Number,
    required: true,
  },
  interestExpense: {
    type: Number,
    required: true,
  },
  incomeBeforeTax: {
    type: Number,
    required: true,
  },
  netIncome: {
    type: Number,
    required: true,
  },
});

const IncomeRow = mongoose.model('IncomeRow', incomerowSchema);
export default IncomeRow;
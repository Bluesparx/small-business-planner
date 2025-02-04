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

const incometableSchema =new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true, 
    },
    
    rows: [incomerowSchema],
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

  
  const IncomeTable = mongoose.model('IncomeTable', incometableSchema);
  export default IncomeTable;
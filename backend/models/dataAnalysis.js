import mongoose from 'mongoose';

const balanceSheetAnalysisSchema = new mongoose.Schema({
  averageAgeOfReceivables: { type: Number },
  currentRatio: { type: Number },
  date: { type: Date },
  debtToEquityRatio: { type: Number },
  inventoryTurnover: { type: Number },
  numberOfDaysforInventoryTurn: { type: Number },
  quickCurrentRatio: { type: Number },
  receivableTurnover: { type: Number },
  workingCapital: { type: Number },
  workingCapitalperDollarSale: { type: Number },
});

const growthBalanceSheetSchema = new mongoose.Schema({
  BalanceSheetMetric: { type: String },
  OverallGrowth: { type: Number },
});

const incomeStatementAnalysisSchema = new mongoose.Schema({
  AssetTurnover: { type: Number },
  InterestCoverageRatio: { type: Number },
  NetProfitRatio: { type: Number },
  OperatingProfitMargin: { type: Number },
  ReturnOnAssets: { type: Number },
  date: { type: Date },
  grossProfitMargin: { type: Number },
});

const growthIncomeStatementSchema = new mongoose.Schema({
  IncomeMetric: { type: String },
  OverallGrowth: { type: Number },
});

const dataAnalysisSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', required: true 
  },
  balanceSheet: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'BalanceSheetTable', 
    required: true 
  },
  incomeStatement: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'IncomeTable', 
    required: true 
  },
  balanceSheetAnalysis: [balanceSheetAnalysisSchema],
  growthBalanceSheet: [growthBalanceSheetSchema], 
  incomeStatementAnalysis: [incomeStatementAnalysisSchema],
  growthIncomeStatement: [growthIncomeStatementSchema], 
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending',
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const DataAnalysis = mongoose.model('DataAnalysis', dataAnalysisSchema);

export default DataAnalysis;

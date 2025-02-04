import mongoose from 'mongoose';

const BalanceSheetRowSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    totalCurrentAssets: {
      type: Number,
      required: true,
    },
    totalCurrentLiabilities: {
      type: Number,
      required: true,
    },
    inventory: {
      type: Number,
      required: true,
    },
    totalLiabilities: {
      type: Number,
      required: true,
    },
    totalStockholdersEquity: {
      type: Number,
      required: true,
    },
    netReceivables: {
      type: Number,
      required: true,
    },
    totalAssets: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

const BalanceSheetTableSchema = new mongoose.Schema(
  {
    user: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    rows: [BalanceSheetRowSchema],
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

const BalanceSheetTable = mongoose.models.BalanceSheetTable || mongoose.model('BalanceSheetTable', BalanceSheetTableSchema);

export default BalanceSheetTable;

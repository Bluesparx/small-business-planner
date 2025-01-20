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


const BalanceSheetRow= mongoose.model('BalanceSheetRow', BalanceSheetRowSchema);

export default BalanceSheetRow ;
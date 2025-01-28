import mongoose from 'mongoose';
import BalanceSheetRowSchema from './BalanceSheetRow.js'; // Import the row schema

const BalanceSheetTableSchema = new mongoose.Schema(
  {
    user: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    rows: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "BalanceSheetRow", // Reference to the BalanceSheetRow schema
      },
    ],
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

const BalanceSheetTable = mongoose.models.BalanceSheetTable || mongoose.model('BalanceSheetTable', BalanceSheetTableSchema);

export default BalanceSheetTable;

import mongoose from 'mongoose';
import BalanceSheetRowSchema from './BalanceSheetRow.js'; // Import the row schema

const BalanceSheetTableSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: false, // Make the name field optional
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

const BalanceSheetTable = mongoose.model('BalanceSheetTable', BalanceSheetTableSchema);

export default BalanceSheetTable;

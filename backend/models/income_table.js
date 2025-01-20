import mongoose from 'mongoose';
import incomerowSchema from './income_row.js';
const incometableSchema =new mongoose.Schema(
  {
    name: {
      type: String,
      required: false, // Make the name field optional
    },
    rows: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "IncomeRow", // Reference to the BalanceSheetRow schema
      },
    ],
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

  
  const IncomeTable = mongoose.model('IncomeTable', incometableSchema);
  export default IncomeTable;
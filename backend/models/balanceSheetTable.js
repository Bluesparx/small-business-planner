const mongoose = require('mongoose');
const BalanceSheetRowSchema = require('./balanceSheetRow'); // Import the row schema

const BalanceSheetTableSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    rows: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BalanceSheetRow', // Reference to the BalanceSheetRow schema
      },
    ],
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

module.exports = mongoose.model('BalanceSheetTable', BalanceSheetTableSchema);

const incometableSchema = new mongoose.Schema({
    rows: {
      type: [incomerowSchema],
      required: true,
      validate: {
        validator: function (v) {
          return Array.isArray(v) && v.length > 0;
        },
        message: 'The table must have at least one row.',
      },
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  });
  
  const IncomeTable = mongoose.model('IncomeTable', incometableSchema);
  export default IncomeTable;
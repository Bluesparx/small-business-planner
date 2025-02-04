import BalanceSheetTable from "../models/balanceSheetTable.js";

// POST: Create a new balance sheet table
// router.post('/balance-sheet/table',
const createBalanceSheetTable = async (req, res) => {
  try {
    const { rows } = req.body;
    const userId = req.user.id;
    console.log(rows);
    // Validate rows
    if (!rows || !Array.isArray(rows)) {
      return res.status(400).json({ error: "Rows must be an array" });
    }

    const newTable = new BalanceSheetTable({
      user: userId,
      rows: rows,
    });

    const savedTable = await newTable.save();
    res.status(201).json(savedTable);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET: Get all balance sheet tables
const getAllBalanceSheetTables = async (req, res) => {
  try {
    const tables = await BalanceSheetTable.find().populate("rows");
    res.status(200).json(tables);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET: Get a specific balance sheet table by ID
const getBalanceSheetTableById = async (req, res) => {
  try {
    const table = await BalanceSheetTable
      .findById(req.params.id)
      .populate("rows");
    if (!table) {
      return res.status(404).json({ error: "Table not found" });
    }
    res.status(200).json(table);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET: Get balance sheet for a user
const getBalanceByUserId = async (req, res) => {
  try {
    const userId = req.user.id; 

    const balanceSheet = await BalanceSheetTable.findOne({ user: userId }).populate("rows");

    if (!balanceSheet) {
      return res.status(404).json({ error: "Balance Sheet not found for this user" });
    }

    res.status(200).json(balanceSheet);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {
  createBalanceSheetTable,
  getAllBalanceSheetTables,
  getBalanceSheetTableById,
  getBalanceByUserId,
};

import BalanceSheetTable from "../models/BalanceSheetTable.js";
import BalanceSheetRow from "../models/BalanceSheetRow.js";

// POST: Create a new balance sheet table
// router.post('/balance-sheet/table',
const createBalanceSheetTable = async (req, res) => {
  try {
    const { name, rows } = req.body;

    // Validate rows
    if (!rows || !Array.isArray(rows)) {
      return res.status(400).json({ error: "Rows must be an array" });
    }

    // Save rows first
    const savedRows = await BalanceSheetRow.insertMany(rows);

    // Create the table with saved row IDs
    const newTable = new BalanceSheetTable({
      name,
      rows: savedRows.map((row) => row._id),
    });

    const savedTable = await newTable.save();
    res.status(201).json(savedTable);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET: Get all balance sheet tables
// router.get('/balance-sheet/table',
const getAllBalanceSheetTables = async (req, res) => {
  try {
    const tables = await BalanceSheetTable.find().populate("rows");
    res.status(200).json(tables);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET: Get a specific balance sheet table by ID
// router.get('/balance-sheet/table/:id',
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

export {
  createBalanceSheetTable,
  getAllBalanceSheetTables,
  getBalanceSheetTableById,
};

import IncomeTable from "../models/income_table.js";

// POST: Create a new income statement table
const createIncomeTable = async (req, res) => {
  try {
    const { name, rows } = req.body;
    const userId = req.user.id;

    // Validate rows
    if (!rows || !Array.isArray(rows)) {
      return res.status(400).json({ error: "Rows must be an array" });
    }

    const newTable = new IncomeTable({
      user: userId,
      name,
      rows,
    });

    const savedTable = await newTable.save();
    res.status(201).json(savedTable);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET: Get all income statement tables
const getAllIncomeTables = async (req, res) => {
  try {
    const tables = await IncomeTable.find().populate("rows");
    res.status(200).json(tables);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET: Get a specific income statement table by ID
const getIncomeTableById = async (req, res) => {
  try {
    const table = await IncomeTable
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

// GET: Get income statement for a user
const getIncomeByUserId = async (req, res) => {
  try {
    const userId = req.user.id;

    const incomeStatement = await IncomeTable.findOne({ user: userId }).populate("rows");

    if (!incomeStatement) {
      return res.status(404).json({ error: "Income Statement not found for this user" });
    }

    res.status(200).json(incomeStatement);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {
  createIncomeTable,
  getAllIncomeTables,
  getIncomeTableById,
  getIncomeByUserId,
};

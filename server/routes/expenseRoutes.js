const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  addExpense,
  getExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
} = require("../controllers/expenseController");

// Create Expense
router.post("/", protect, addExpense);

// Get All Expenses
router.get("/", protect, getExpenses);

// Get One Expense
router.get("/:id", protect, getExpenseById);

// Update Expense
router.put("/:id", protect, updateExpense);

// Delete Expense
router.delete("/:id", protect, deleteExpense);

module.exports = router;
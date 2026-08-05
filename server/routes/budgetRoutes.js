const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  setBudget,
  getBudgets,
  getBudgetById,
  deleteBudget,
} = require("../controllers/budgetController");

// Create or Update Budget
router.post("/", protect, setBudget);

// Get All Budgets
router.get("/", protect, getBudgets);

// Get Single Budget
router.get("/:id", protect, getBudgetById);

// Delete Budget
router.delete("/:id", protect, deleteBudget);

module.exports = router;
const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  addIncome,
  getIncome,
  getIncomeById,
  updateIncome,
  deleteIncome,
} = require("../controllers/incomeController");

// Add Income
router.post("/", protect, addIncome);

// Get All Income
router.get("/", protect, getIncome);

// Get Single Income
router.get("/:id", protect, getIncomeById);

// Update Income
router.put("/:id", protect, updateIncome);

// Delete Income
router.delete("/:id", protect, deleteIncome);

module.exports = router;
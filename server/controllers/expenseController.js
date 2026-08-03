const Expense = require("../models/Expense");

// ================= ADD EXPENSE =================
const addExpense = async (req, res) => {
  try {
    const { title, amount, category, date, notes } = req.body;

    if (!title || !amount || !category) {
      return res.status(400).json({
        success: false,
        message: "Title, Amount and Category are required",
      });
    }

    const expense = await Expense.create({
      title,
      amount,
      category,
      date,
      notes,
      user: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Expense Added Successfully",
      expense,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ================= GET ALL EXPENSES =================
const getExpenses = async (req, res) => {
  try {

    const expenses = await Expense.find({
      user: req.user.id,
    }).sort({ date: -1 });

    res.status(200).json({
      success: true,
      count: expenses.length,
      expenses,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};

module.exports = {
  addExpense,
  getExpenses,
};
// ================= GET SINGLE EXPENSE =================
const getExpenseById = async (req, res) => {
  try {

    const expense = await Expense.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found",
      });
    }

    res.status(200).json({
      success: true,
      expense,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};
// ================= UPDATE EXPENSE =================
const updateExpense = async (req, res) => {
  try {

    const expense = await Expense.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found",
      });
    }

    const updatedExpense = await Expense.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Expense Updated Successfully",
      expense: updatedExpense,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};
// ================= DELETE EXPENSE =================
const deleteExpense = async (req, res) => {
  try {

    const expense = await Expense.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found",
      });
    }

    await expense.deleteOne();

    res.status(200).json({
      success: true,
      message: "Expense Deleted Successfully",
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};

module.exports = {
  addExpense,
  getExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
};
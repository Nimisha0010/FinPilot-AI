const Budget = require("../models/Budget");

// ================= SET / UPDATE BUDGET =================
const setBudget = async (req, res) => {
  try {
    const { amount, month, year } = req.body;

    if (!amount || !month || !year) {
      return res.status(400).json({
        success: false,
        message: "Amount, month and year are required",
      });
    }

    // Check if budget already exists
    let budget = await Budget.findOne({
      user: req.user.id,
      month,
      year,
    });

    if (budget) {
      budget.amount = amount;
      await budget.save();

      return res.status(200).json({
        success: true,
        message: "Budget Updated Successfully",
        budget,
      });
    }

    // Create new budget
    budget = await Budget.create({
      amount,
      month,
      year,
      user: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Budget Created Successfully",
      budget,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ================= GET ALL BUDGETS =================
const getBudgets = async (req, res) => {
  try {

    const budgets = await Budget.find({
      user: req.user.id,
    }).sort({ year: -1, month: -1 });

    res.status(200).json({
      success: true,
      count: budgets.length,
      budgets,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ================= GET SINGLE BUDGET =================
const getBudgetById = async (req, res) => {
  try {

    const budget = await Budget.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!budget) {
      return res.status(404).json({
        success: false,
        message: "Budget not found",
      });
    }

    res.status(200).json({
      success: true,
      budget,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ================= DELETE BUDGET =================
const deleteBudget = async (req, res) => {
  try {

    const budget = await Budget.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!budget) {
      return res.status(404).json({
        success: false,
        message: "Budget not found",
      });
    }

    await budget.deleteOne();

    res.status(200).json({
      success: true,
      message: "Budget Deleted Successfully",
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
  setBudget,
  getBudgets,
  getBudgetById,
  deleteBudget,
};
const Income = require("../models/Income");

// ================= ADD INCOME =================
const addIncome = async (req, res) => {
  try {
    const { title, amount, source, date, notes } = req.body;

    if (!title || !amount || !source) {
      return res.status(400).json({
        success: false,
        message: "Title, Amount and Source are required",
      });
    }

    const income = await Income.create({
      title,
      amount,
      source,
      date,
      notes,
      user: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Income Added Successfully",
      income,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ================= GET ALL INCOME =================
const getIncome = async (req, res) => {
  try {

    const incomes = await Income.find({
      user: req.user.id,
    }).sort({ date: -1 });

    res.status(200).json({
      success: true,
      count: incomes.length,
      incomes,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ================= GET SINGLE INCOME =================
const getIncomeById = async (req, res) => {
  try {

    const income = await Income.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!income) {
      return res.status(404).json({
        success: false,
        message: "Income not found",
      });
    }

    res.status(200).json({
      success: true,
      income,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ================= UPDATE INCOME =================
const updateIncome = async (req, res) => {
  try {

    const income = await Income.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!income) {
      return res.status(404).json({
        success: false,
        message: "Income not found",
      });
    }

    const updatedIncome = await Income.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Income Updated Successfully",
      income: updatedIncome,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ================= DELETE INCOME =================
const deleteIncome = async (req, res) => {
  try {

    const income = await Income.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!income) {
      return res.status(404).json({
        success: false,
        message: "Income not found",
      });
    }

    await income.deleteOne();

    res.status(200).json({
      success: true,
      message: "Income Deleted Successfully",
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
  addIncome,
  getIncome,
  getIncomeById,
  updateIncome,
  deleteIncome,
};
const mongoose = require("mongoose");
const Expense = require("../models/Expense");

// ================= DASHBOARD =================
const getDashboard = async (req, res) => {
  try {
    // ================= SUMMARY =================
    const summary = await Expense.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(req.user.id),
        },
      },
      {
        $group: {
          _id: null,
          totalExpenses: { $sum: "$amount" },
          totalTransactions: { $sum: 1 },
          averageExpense: { $avg: "$amount" },
          highestExpense: { $max: "$amount" },
        },
      },
    ]);

    const dashboardSummary =
      summary.length > 0
        ? summary[0]
        : {
            totalExpenses: 0,
            totalTransactions: 0,
            averageExpense: 0,
            highestExpense: 0,
          };

    // ================= RECENT EXPENSES =================
    const recentExpenses = await Expense.find({
      user: req.user.id,
    })
      .sort({ date: -1 })
      .limit(5);

    // ================= CATEGORY BREAKDOWN =================
    const categoryBreakdown = await Expense.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(req.user.id),
        },
      },
      {
        $group: {
          _id: "$category",
          total: {
            $sum: "$amount",
          },
        },
      },
      {
        $sort: {
          total: -1,
        },
      },
    ]);

    // ================= MONTHLY BREAKDOWN =================
    const monthlyBreakdown = await Expense.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(req.user.id),
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$date" },
            month: { $month: "$date" },
          },
          total: {
            $sum: "$amount",
          },
          transactions: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          "_id.year": -1,
          "_id.month": -1,
        },
      },
    ]);

    // ================= RESPONSE =================
    res.status(200).json({
      success: true,

      summary: {
        totalExpenses: dashboardSummary.totalExpenses,
        totalTransactions: dashboardSummary.totalTransactions,
        averageExpense: Number(
          (dashboardSummary.averageExpense || 0).toFixed(2)
        ),
        highestExpense: dashboardSummary.highestExpense,
      },

      categoryBreakdown,

      monthlyBreakdown,

      recentExpenses,
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
  getDashboard,
};
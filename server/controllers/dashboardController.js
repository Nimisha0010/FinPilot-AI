const mongoose = require("mongoose");
const Expense = require("../models/Expense");
const Income = require("../models/Income");
const Budget = require("../models/Budget");

// ================= DASHBOARD =================
const getDashboard = async (req, res) => {
  try {
    // ================= EXPENSE SUMMARY =================
    const expenseSummary = await Expense.aggregate([
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

    const dashboardExpense =
      expenseSummary.length > 0
        ? expenseSummary[0]
        : {
            totalExpenses: 0,
            totalTransactions: 0,
            averageExpense: 0,
            highestExpense: 0,
          };

    // ================= INCOME SUMMARY =================
    const incomeSummary = await Income.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(req.user.id),
        },
      },
      {
        $group: {
          _id: null,
          totalIncome: { $sum: "$amount" },
          totalIncomeTransactions: { $sum: 1 },
        },
      },
    ]);

    const dashboardIncome =
      incomeSummary.length > 0
        ? incomeSummary[0]
        : {
            totalIncome: 0,
            totalIncomeTransactions: 0,
          };

    // ================= CURRENT MONTH BUDGET =================
    const currentDate = new Date();

    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    const budget = await Budget.findOne({
      user: req.user.id,
      month: currentMonth,
      year: currentYear,
    });

    const budgetAmount = budget ? budget.amount : 0;

    // ================= BALANCE =================
    const remainingBalance =
      dashboardIncome.totalIncome - dashboardExpense.totalExpenses;

    const savingsRate =
      dashboardIncome.totalIncome > 0
        ? Number(
            (
              (remainingBalance / dashboardIncome.totalIncome) *
              100
            ).toFixed(2)
          )
        : 0;

    // ================= BUDGET ANALYTICS =================
    const remainingBudget =
      budgetAmount - dashboardExpense.totalExpenses;

    const budgetUsedPercentage =
      budgetAmount > 0
        ? Number(
            (
              (dashboardExpense.totalExpenses / budgetAmount) *
              100
            ).toFixed(2)
          )
        : 0;

    const budgetStatus =
      remainingBudget >= 0
        ? "Within Budget"
        : "Over Budget";

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
        totalIncome: dashboardIncome.totalIncome,

        totalExpenses: dashboardExpense.totalExpenses,

        remainingBalance,

        savingsRate,

        budget: budgetAmount,

        remainingBudget,

        budgetUsedPercentage,

        budgetStatus,

        totalTransactions:
          dashboardExpense.totalTransactions +
          dashboardIncome.totalIncomeTransactions,

        averageExpense: Number(
          (dashboardExpense.averageExpense || 0).toFixed(2)
        ),

        highestExpense: dashboardExpense.highestExpense,
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
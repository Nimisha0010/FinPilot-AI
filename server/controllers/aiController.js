const { GoogleGenAI } = require("@google/genai");
const Expense = require("../models/Expense");
const Income = require("../models/Income");
const Budget = require("../models/Budget");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// ================= AI INSIGHTS =================
const getInsights = async (req, res) => {
  try {
    // ================= FETCH USER DATA =================
    const expenses = await Expense.find({ user: req.user.id });

    const incomes = await Income.find({ user: req.user.id });

    const currentDate = new Date();

    const budget = await Budget.findOne({
      user: req.user.id,
      month: currentDate.getMonth() + 1,
      year: currentDate.getFullYear(),
    });

    // ================= CALCULATE SUMMARY =================
    const totalIncome = incomes.reduce(
      (sum, income) => sum + income.amount,
      0
    );

    const totalExpenses = expenses.reduce(
      (sum, expense) => sum + expense.amount,
      0
    );

    const remainingBalance = totalIncome - totalExpenses;

    const budgetAmount = budget ? budget.amount : 0;

    const savingsRate =
      totalIncome > 0
        ? (
            (remainingBalance / totalIncome) *
            100
          ).toFixed(2)
        : 0;

    // ================= BUILD PROMPT =================
    const prompt = `
You are FinPilot AI, an expert personal financial advisor.

Analyze the following financial data.

Financial Summary:
- Total Income: ₹${totalIncome}
- Total Expenses: ₹${totalExpenses}
- Remaining Balance: ₹${remainingBalance}
- Monthly Budget: ₹${budgetAmount}
- Savings Rate: ${savingsRate}%

Expense List:
${expenses
  .map(
    (expense) =>
      `• ${expense.title} - ₹${expense.amount} (${expense.category})`
  )
  .join("\n")}

Instructions:
- Give exactly 5 financial insights.
- Each insight should be one sentence.
- Keep each insight under 20 words.
- Each insight must be on a new line.
- Do NOT number the insights.
- Do NOT use markdown.
- Focus on spending habits, budgeting, savings and financial improvements.
`;

    // ================= CALL GEMINI =================
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
    });

    // ================= FORMAT RESPONSE =================
    const insights = response.text
      .split(/\r?\n/)
      .map((line) =>
        line
          .replace(/^\d+\.\s*/, "")
          .replace(/^[-•]\s*/, "")
          .trim()
      )
      .filter((line) => line.length > 0);

    // ================= SEND RESPONSE =================
    res.status(200).json({
      success: true,

      summary: {
        totalIncome,
        totalExpenses,
        remainingBalance,
        budget: budgetAmount,
        savingsRate: Number(savingsRate),
      },

      insights,
    });

  } catch (error) {
    console.error("AI Controller Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to generate AI insights.",
      error: error.message,
    });
  }
};

module.exports = {
  getInsights,
};
const { GoogleGenAI } = require("@google/genai");

const Expense = require("../models/Expense");
const Income = require("../models/Income");
const Budget = require("../models/Budget");

// ================= GEMINI CLIENT =================

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// ================= AI INSIGHTS =================

const getInsights = async (req, res) => {
  try {
    // ================= CHECK AUTH =================

    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Not Authorized",
      });
    }

    // ================= FETCH USER DATA =================

    const expenses = await Expense.find({
      user: req.user.id,
    });

    const incomes = await Income.find({
      user: req.user.id,
    });

    const currentDate = new Date();

    const budget = await Budget.findOne({
      user: req.user.id,
      month: currentDate.getMonth() + 1,
      year: currentDate.getFullYear(),
    });

    // ================= CALCULATE SUMMARY =================

    const totalIncome = incomes.reduce(
      (sum, income) => sum + Number(income.amount || 0),
      0
    );

    const totalExpenses = expenses.reduce(
      (sum, expense) => sum + Number(expense.amount || 0),
      0
    );

    const remainingBalance =
      totalIncome - totalExpenses;

    const budgetAmount = budget
      ? Number(budget.amount || 0)
      : 0;

    const savingsRate =
      totalIncome > 0
        ? Number(
            (
              (remainingBalance / totalIncome) *
              100
            ).toFixed(2)
          )
        : 0;

    // ================= EXPENSE DATA =================

    const expenseList =
      expenses.length > 0
        ? expenses
            .map(
              (expense) =>
                `- ${expense.title || "Expense"}: ₹${Number(
                  expense.amount || 0
                )} (${expense.category || "Other"})`
            )
            .join("\n")
        : "No expenses recorded.";

    // ================= BUILD PROMPT =================

    const prompt = `
You are FinPilot AI, an expert personal financial advisor.

Analyze the user's financial data and provide practical financial advice.

Financial Summary:

Total Income: ₹${totalIncome}
Total Expenses: ₹${totalExpenses}
Remaining Balance: ₹${remainingBalance}
Monthly Budget: ₹${budgetAmount}
Savings Rate: ${savingsRate}%

Expense List:

${expenseList}

Instructions:

- Give exactly 5 financial insights.
- Each insight must be one sentence.
- Keep each insight under 20 words.
- Put each insight on a separate line.
- Do not number the insights.
- Do not use markdown.
- Focus on spending habits, budgeting, savings, and financial improvements.
- Make the advice specific to the user's financial data.
`;

    // ================= CALL GEMINI =================

    let response;

    try {
      response = await ai.models.generateContent({
        model: "gemini-3.5-flash-lite",
        contents: prompt,
      });
    } catch (geminiError) {
      console.error(
        "Gemini API Error:",
        geminiError
      );

      // ================= RATE LIMIT =================

      if (
        geminiError?.status === 429 ||
        geminiError?.code === 429 ||
        geminiError?.response?.status === 429 ||
        geminiError?.message?.includes("429") ||
        geminiError?.message
          ?.toLowerCase()
          ?.includes("quota")
      ) {
        return res.status(429).json({
          success: false,
          message:
            "Gemini API rate limit or quota reached. Please try again later.",
        });
      }

      // ================= OTHER GEMINI ERROR =================

      return res.status(502).json({
        success: false,
        message:
          "Unable to connect to the Gemini AI service.",
      });
    }

    // ================= GET TEXT =================

    const generatedText =
      typeof response?.text === "string"
        ? response.text
        : "";

    if (!generatedText.trim()) {
      return res.status(502).json({
        success: false,
        message:
          "Gemini returned an empty response.",
      });
    }

    // ================= FORMAT INSIGHTS =================

    const insights = generatedText
      .split(/\r?\n/)
      .map((line) =>
        line
          .replace(/^\d+\.\s*/, "")
          .replace(/^[-•*]\s*/, "")
          .trim()
      )
      .filter((line) => line.length > 0)
      .slice(0, 5);

    // ================= VALIDATE INSIGHTS =================

    if (insights.length === 0) {
      return res.status(502).json({
        success: false,
        message:
          "Gemini did not return usable financial insights.",
      });
    }

    // ================= SEND RESPONSE =================

    return res.status(200).json({
      success: true,

      summary: {
        totalIncome,
        totalExpenses,
        remainingBalance,
        budget: budgetAmount,
        savingsRate,
      },

      insights,
    });
  } catch (error) {
    console.error(
      "AI Controller Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to generate AI insights.",
    });
  }
};

// ================= EXPORT =================

module.exports = {
  getInsights,
};
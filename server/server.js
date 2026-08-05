const express = require("express");
const cors = require("cors");
const dns = require("dns");
require("dotenv").config();

// Force Node.js to use Google's DNS servers
dns.setServers(["8.8.8.8", "8.8.4.4"]);

// =====================
// Database Connection
// =====================
const connectDB = require("./config/db");

// =====================
// Import Routes
// =====================
const authRoutes = require("./routes/authRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const incomeRoutes = require("./routes/incomeRoutes");
const budgetRoutes = require("./routes/budgetRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const aiRoutes = require("./routes/aiRoutes");

const app = express();

// =====================
// Connect Database
// =====================
connectDB();

// =====================
// Middleware
// =====================
app.use(cors());
app.use(express.json());

// =====================
// API Routes
// =====================
app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/income", incomeRoutes);
app.use("/api/budget", budgetRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/ai", aiRoutes);

// =====================
// Health Check Route
// =====================
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🚀 FinPilot AI Backend Running Successfully",
  });
});

// =====================
// 404 Route Handler
// =====================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

// =====================
// Global Error Handler
// =====================
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});

// =====================
// Start Server
// =====================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
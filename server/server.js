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
const dashboardRoutes = require("./routes/dashboardRoutes");
const incomeRoutes = require("./routes/incomeRoutes");
const budgetRoutes = require("./routes/budgetRoutes");

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
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/income", incomeRoutes);
app.use("/api/budget", budgetRoutes);

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
// Handle Unknown Routes
// =====================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

// =====================
// Start Server
// =====================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
const express = require("express");
const cors = require("cors");
const dns = require("dns");
require("dotenv").config();

// Force Node.js to use Google's DNS servers
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const connectDB = require("./config/db");

// =====================
// Import Routes
// =====================
const authRoutes = require("./routes/authRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

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

// =====================
// Test Route
// =====================
app.get("/", (req, res) => {
  res.send("🚀 FinPilot AI Backend Running");
});

// =====================
// Start Server
// =====================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
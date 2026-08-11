import { Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Income from "./pages/Income";
import Expense from "./pages/Expense";
import Budget from "./pages/Budget";

function App() {
  return (
    <Routes>

      {/* ================= LANDING ================= */}
      <Route
        path="/"
        element={<Landing />}
      />

      {/* ================= AUTHENTICATION ================= */}
      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      {/* ================= DASHBOARD ================= */}
      <Route
        path="/dashboard"
        element={<Dashboard />}
      />

      {/* ================= INCOME ================= */}
      <Route
        path="/income"
        element={<Income />}
      />

      {/* ================= EXPENSE ================= */}
      <Route
        path="/expense"
        element={<Expense />}
      />

      {/* Support old/plural route too */}
      <Route
        path="/expenses"
        element={<Expense />}
      />

      {/* ================= BUDGET ================= */}
      <Route
        path="/budget"
        element={<Budget />}
      />

      {/* ================= FALLBACK ================= */}
      <Route
        path="*"
        element={
          <div
            style={{
              minHeight: "100vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#111418",
              color: "#ffffff",
              fontFamily: "Arial, sans-serif",
              flexDirection: "column",
              gap: "12px",
              padding: "30px",
              textAlign: "center",
            }}
          >
            <h1 style={{ margin: 0 }}>
              Route Not Found
            </h1>

            <p
              style={{
                margin: 0,
                color: "#94a3b8",
              }}
            >
              The page you are trying to open does not exist.
            </p>

            <button
              onClick={() =>
                window.location.href = "/dashboard"
              }
              style={{
                marginTop: "10px",
                padding: "10px 20px",
                borderRadius: "10px",
                border: "none",
                background: "#4b91e2",
                color: "white",
                cursor: "pointer",
                fontWeight: "600",
              }}
            >
              Back to Dashboard
            </button>
          </div>
        }
      />

    </Routes>
  );
}

export default App;
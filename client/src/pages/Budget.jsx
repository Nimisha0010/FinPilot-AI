import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import API from "../api/axios";
import Input from "../components/common/Input";
import Button from "../components/common/Button";

function Budget() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    amount: "",
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.amount) {
      toast.error("Budget amount is required");
      return;
    }

    try {
      setLoading(true);

      await API.post("/budget", {
        amount: Number(formData.amount),
        month: Number(formData.month),
        year: Number(formData.year),
      });

      toast.success("Budget set successfully!");

      navigate("/dashboard");
    } catch (error) {
      console.error("Budget Error:", error);
      console.error("Response:", error.response?.data);

      toast.error(
        error.response?.data?.message || "Failed to set budget"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--text-primary)] flex items-center justify-center px-6">

      <div className="w-full max-w-lg bg-[var(--card)] border border-[var(--border)] rounded-3xl p-8">

        <h1 className="text-3xl font-bold">
          Set Monthly Budget
        </h1>

        <p className="text-[var(--text-secondary)] mt-2 mb-8">
          Set a spending limit for the month.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          <Input
            label="Budget Amount"
            name="amount"
            type="number"
            placeholder="30000"
            value={formData.amount}
            onChange={handleChange}
          />

          <div>
            <label className="block mb-2 text-[var(--text-secondary)]">
              Month
            </label>

            <select
              name="month"
              value={formData.month}
              onChange={handleChange}
              className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-[var(--text-primary)] outline-none"
            >
              <option value="1">January</option>
              <option value="2">February</option>
              <option value="3">March</option>
              <option value="4">April</option>
              <option value="5">May</option>
              <option value="6">June</option>
              <option value="7">July</option>
              <option value="8">August</option>
              <option value="9">September</option>
              <option value="10">October</option>
              <option value="11">November</option>
              <option value="12">December</option>
            </select>
          </div>

          <Input
            label="Year"
            name="year"
            type="number"
            value={formData.year}
            onChange={handleChange}
          />

          <Button
            type="submit"
            disabled={loading}
            className="w-full"
          >
            {loading ? "Saving Budget..." : "Set Budget"}
          </Button>

        </form>

        <button
          type="button"
          onClick={() => navigate("/dashboard")}
          className="w-full mt-4 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
        >
          ← Back to Dashboard
        </button>

      </div>

    </div>
  );
}

export default Budget;
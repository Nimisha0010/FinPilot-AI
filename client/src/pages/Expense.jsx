import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import API from "../api/axios";
import Input from "../components/common/Input";
import Button from "../components/common/Button";

function Expense() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
    notes: "",
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

    if (!formData.title || !formData.amount || !formData.category) {
      toast.error("Title, Amount and Category are required");
      return;
    }

    try {
      setLoading(true);

      await API.post("/expenses", {
        title: formData.title,
        amount: Number(formData.amount),
        category: formData.category,
        date: formData.date || new Date().toISOString(),
        notes: formData.notes,
      });

      toast.success("Expense added successfully!");

      setFormData({
        title: "",
        amount: "",
        category: "",
        date: "",
        notes: "",
      });

      navigate("/dashboard");
    } catch (error) {
      console.error("Expense Error:", error);
      console.error("Response:", error.response?.data);

      toast.error(
        error.response?.data?.message || "Failed to add expense"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--text-primary)] flex items-center justify-center px-6">

      <div className="w-full max-w-lg bg-[var(--card)] border border-[var(--border)] rounded-3xl p-8">

        <h1 className="text-3xl font-bold">
          Add Expense
        </h1>

        <p className="text-[var(--text-secondary)] mt-2 mb-8">
          Track your spending and keep your finances organized.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          <Input
            label="Title"
            name="title"
            placeholder="Groceries, Electricity Bill..."
            value={formData.title}
            onChange={handleChange}
          />

          <Input
            label="Amount"
            name="amount"
            type="number"
            placeholder="Enter amount"
            value={formData.amount}
            onChange={handleChange}
          />

          <div>
            <label className="block mb-2 text-[var(--text-secondary)]">
              Category
            </label>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-[var(--text-primary)] outline-none"
            >
              <option value="">Select Category</option>
              <option value="Food">Food</option>
              <option value="Bills">Bills</option>
              <option value="Transport">Transport</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Shopping">Shopping</option>
              <option value="Health">Health</option>
              <option value="Education">Education</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <Input
            label="Date"
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
          />

          <Input
            label="Notes"
            name="notes"
            placeholder="Optional notes"
            value={formData.notes}
            onChange={handleChange}
          />

          <Button
            type="submit"
            disabled={loading}
            className="w-full"
          >
            {loading ? "Adding Expense..." : "Add Expense"}
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

export default Expense;
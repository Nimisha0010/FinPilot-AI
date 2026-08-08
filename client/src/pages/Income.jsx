import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import API from "../api/axios";
import Input from "../components/common/Input";
import Button from "../components/common/Button";

function Income() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    source: "",
    amount: "",
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

    if (
      !formData.title ||
      !formData.source ||
      !formData.amount
    ) {
      toast.error("Title, Amount and Source are required");
      return;
    }

    try {
      setLoading(true);

      await API.post("/income", {
        title: formData.title,
        source: formData.source,
        amount: Number(formData.amount),
        date: formData.date || new Date().toISOString(),
        notes: formData.notes,
      });

      toast.success("Income added successfully!");

      setFormData({
        title: "",
        source: "",
        amount: "",
        date: "",
        notes: "",
      });

      navigate("/dashboard");

    } catch (error) {
      console.error("Income Error:", error);
      console.error("Response:", error.response?.data);

      toast.error(
        error.response?.data?.message || "Failed to add income"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--text-primary)] flex items-center justify-center px-6">

      <div className="w-full max-w-lg bg-[var(--card)] border border-[var(--border)] rounded-3xl p-8">

        <h1 className="text-3xl font-bold">
          Add Income
        </h1>

        <p className="text-[var(--text-secondary)] mt-2 mb-8">
          Record your income and keep your finances updated.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          <Input
            label="Title"
            name="title"
            placeholder="Salary, Freelance Payment..."
            value={formData.title}
            onChange={handleChange}
          />

          <Input
            label="Source"
            name="source"
            placeholder="Company, Client, Business..."
            value={formData.source}
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
            {loading ? "Adding Income..." : "Add Income"}
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

export default Income;
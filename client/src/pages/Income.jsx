import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowTrendUp,
  FaBuilding,
  FaCalendarDays,
  FaIndianRupeeSign,
  FaNoteSticky,
  FaWallet,
  FaArrowLeft,
} from "react-icons/fa6";

import API from "../api/axios";

function Income() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    source: "",
    amount: "",
    date: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!form.title || !form.amount || !form.source) {
      setError("Title, Amount and Source are required");
      return;
    }

    try {
      setLoading(true);

      await API.post("/income", {
        title: form.title,
        source: form.source,
        amount: Number(form.amount),
        date: form.date || new Date().toISOString(),
        notes: form.notes,
      });

      setSuccess("Income added successfully!");

      setForm({
        title: "",
        source: "",
        amount: "",
        date: "",
        notes: "",
      });

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);

    } catch (err) {
      console.error("Add Income Error:", err);

      setError(
        err?.response?.data?.message ||
        "Failed to add income. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-full px-4 md:px-6 lg:px-8 py-6">

      {/* ================= PAGE HEADER ================= */}

      <div className="max-w-5xl mx-auto mb-6">

        <button
          onClick={() => navigate("/dashboard")}
          className="
            flex
            items-center
            gap-2
            text-sm
            text-[#7f8ea3]
            hover:text-white
            transition
            mb-5
          "
        >
          <FaArrowLeft className="text-xs" />
          Back to Dashboard
        </button>


        <div className="flex items-center gap-4">

          <div
            className="
              w-14
              h-14
              rounded-2xl
              bg-gradient-to-br
              from-[#315c91]
              to-[#263d60]
              border
              border-[#416d9f]
              flex
              items-center
              justify-center
              text-[#8fc4ff]
              shadow-lg
            "
          >
            <FaArrowTrendUp className="text-xl" />
          </div>

          <div>

            <p className="text-xs uppercase tracking-[0.15em] text-[#71829a]">
              Financial Management
            </p>

            <h1 className="text-2xl md:text-3xl font-bold text-white mt-1">
              Add Income
            </h1>

            <p className="text-sm text-[#8190a3] mt-1">
              Record your earnings and keep your finances updated.
            </p>

          </div>

        </div>

      </div>


      {/* ================= MAIN CONTENT ================= */}

      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">


        {/* ================= FORM CARD ================= */}

        <div
          className="
            rounded-3xl
            border
            border-[#303b4b]
            bg-gradient-to-br
            from-[#202a37]
            via-[#1d2530]
            to-[#1a212b]
            shadow-[0_10px_40px_rgba(0,0,0,0.18)]
            overflow-hidden
          "
        >

          {/* CARD HEADER */}

          <div
            className="
              px-6
              md:px-8
              py-6
              border-b
              border-[#303b4b]
            "
          >

            <div className="flex items-center justify-between">

              <div>

                <h2 className="text-lg font-semibold text-white">
                  Income Details
                </h2>

                <p className="text-xs text-[#718096] mt-1">
                  Enter the details of your income transaction.
                </p>

              </div>

              <div
                className="
                  w-10
                  h-10
                  rounded-xl
                  bg-[#263c59]
                  border
                  border-[#3c6089]
                  flex
                  items-center
                  justify-center
                  text-[#79b5f5]
                "
              >
                <FaWallet />
              </div>

            </div>

          </div>


          {/* FORM */}

          <form
            onSubmit={handleSubmit}
            className="p-6 md:p-8 space-y-6"
          >

            {/* TITLE */}

            <div>

              <label className="block text-xs font-medium text-[#9ba9ba] mb-2">
                Title
              </label>

              <div className="relative">

                <FaNoteSticky
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-[#718096]
                    text-sm
                  "
                />

                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Salary, Freelance Payment..."
                  className="
                    w-full
                    h-12
                    pl-11
                    pr-4
                    rounded-xl
                    bg-[#151b23]
                    border
                    border-[#303b4b]
                    text-white
                    text-sm
                    placeholder:text-[#596677]
                    outline-none
                    focus:border-[#4b91e2]
                    focus:ring-2
                    focus:ring-[#4b91e2]/10
                    transition
                  "
                />

              </div>

            </div>


            {/* SOURCE */}

            <div>

              <label className="block text-xs font-medium text-[#9ba9ba] mb-2">
                Source
              </label>

              <div className="relative">

                <FaBuilding
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-[#718096]
                    text-sm
                  "
                />

                <input
                  type="text"
                  name="source"
                  value={form.source}
                  onChange={handleChange}
                  placeholder="Company, Client, Business..."
                  className="
                    w-full
                    h-12
                    pl-11
                    pr-4
                    rounded-xl
                    bg-[#151b23]
                    border
                    border-[#303b4b]
                    text-white
                    text-sm
                    placeholder:text-[#596677]
                    outline-none
                    focus:border-[#4b91e2]
                    focus:ring-2
                    focus:ring-[#4b91e2]/10
                    transition
                  "
                />

              </div>

            </div>


            {/* AMOUNT + DATE */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {/* AMOUNT */}

              <div>

                <label className="block text-xs font-medium text-[#9ba9ba] mb-2">
                  Amount
                </label>

                <div className="relative">

                  <FaIndianRupeeSign
                    className="
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                      text-[#69b3ff]
                      text-sm
                    "
                  />

                  <input
                    type="number"
                    name="amount"
                    value={form.amount}
                    onChange={handleChange}
                    placeholder="Enter amount"
                    min="0"
                    className="
                      w-full
                      h-12
                      pl-11
                      pr-4
                      rounded-xl
                      bg-[#151b23]
                      border
                      border-[#303b4b]
                      text-white
                      text-sm
                      placeholder:text-[#596677]
                      outline-none
                      focus:border-[#4b91e2]
                      focus:ring-2
                      focus:ring-[#4b91e2]/10
                      transition
                    "
                  />

                </div>

              </div>


              {/* DATE */}

              <div>

                <label className="block text-xs font-medium text-[#9ba9ba] mb-2">
                  Date
                </label>

                <div className="relative">

                  <FaCalendarDays
                    className="
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                      text-[#718096]
                      text-sm
                      pointer-events-none
                    "
                  />

                  <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    className="
                      w-full
                      h-12
                      pl-11
                      pr-4
                      rounded-xl
                      bg-[#151b23]
                      border
                      border-[#303b4b]
                      text-white
                      text-sm
                      outline-none
                      focus:border-[#4b91e2]
                      focus:ring-2
                      focus:ring-[#4b91e2]/10
                      transition
                    "
                  />

                </div>

              </div>

            </div>


            {/* NOTES */}

            <div>

              <label className="block text-xs font-medium text-[#9ba9ba] mb-2">
                Notes
              </label>

              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                placeholder="Optional notes..."
                rows="4"
                className="
                  w-full
                  resize-none
                  px-4
                  py-3
                  rounded-xl
                  bg-[#151b23]
                  border
                  border-[#303b4b]
                  text-white
                  text-sm
                  placeholder:text-[#596677]
                  outline-none
                  focus:border-[#4b91e2]
                  focus:ring-2
                  focus:ring-[#4b91e2]/10
                  transition
                "
              />

            </div>


            {/* ERROR */}

            {error && (

              <div
                className="
                  px-4
                  py-3
                  rounded-xl
                  bg-red-500/10
                  border
                  border-red-500/25
                  text-red-400
                  text-sm
                "
              >
                {error}
              </div>

            )}


            {/* SUCCESS */}

            {success && (

              <div
                className="
                  px-4
                  py-3
                  rounded-xl
                  bg-emerald-500/10
                  border
                  border-emerald-500/25
                  text-emerald-400
                  text-sm
                "
              >
                {success}
              </div>

            )}


            {/* BUTTON */}

            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                h-12
                rounded-xl
                bg-gradient-to-r
                from-[#4b91e2]
                to-[#5b9deb]
                hover:from-[#5b9deb]
                hover:to-[#6aa8f0]
                text-white
                font-semibold
                text-sm
                shadow-[0_6px_20px_rgba(75,145,226,0.2)]
                transition
                disabled:opacity-50
                disabled:cursor-not-allowed
              "
            >
              {loading ? "Adding Income..." : "Add Income"}
            </button>

          </form>

        </div>


        {/* ================= SIDE CARD ================= */}

        <div className="space-y-4">

          {/* QUICK INFO */}

          <div
            className="
              rounded-3xl
              p-6
              bg-gradient-to-br
              from-[#243a5a]
              via-[#253c5d]
              to-[#20334f]
              border
              border-[#365b85]
            "
          >

            <div
              className="
                w-11
                h-11
                rounded-xl
                bg-[#315982]
                border
                border-[#4b78a7]
                flex
                items-center
                justify-center
                text-[#91c5ff]
                mb-5
              "
            >
              <FaArrowTrendUp />
            </div>

            <h3 className="text-base font-semibold text-white">
              Track Your Income
            </h3>

            <p className="text-xs text-[#9bb1cb] leading-5 mt-2">
              Keeping your income records updated helps FinPilot
              calculate your balance, savings rate and financial insights.
            </p>

          </div>


          {/* INCOME SOURCES */}

          <div
            className="
              rounded-3xl
              p-6
              bg-[#1b222c]
              border
              border-[#303b4b]
            "
          >

            <h3 className="text-sm font-semibold text-white mb-4">
              Common Income Sources
            </h3>

            <div className="space-y-3">

              {[
                ["Salary", "Monthly earnings"],
                ["Freelance", "Project payments"],
                ["Business", "Business income"],
                ["Investments", "Investment returns"],
              ].map(([title, description]) => (

                <div
                  key={title}
                  className="
                    flex
                    items-center
                    justify-between
                    gap-3
                    p-3
                    rounded-xl
                    bg-[#151b23]
                    border
                    border-[#293441]
                  "
                >

                  <div>

                    <p className="text-xs font-medium text-[#e5e7eb]">
                      {title}
                    </p>

                    <p className="text-[10px] text-[#687789] mt-1">
                      {description}
                    </p>

                  </div>

                  <div className="w-2 h-2 rounded-full bg-[#69aaf0]" />

                </div>

              ))}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Income;
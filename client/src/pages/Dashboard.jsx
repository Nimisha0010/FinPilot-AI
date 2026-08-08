import { useEffect, useState } from "react";
import API from "../api/axios";
import useAuth from "../hooks/useAuth";

import Sidebar from "../components/dashboard/Sidebar";
import AIInsights from "../components/dashboard/AIInsights";

import {
  FaArrowUp,
  FaArrowDown,
  FaWallet,
  FaChartLine,
  FaPlus,
} from "react-icons/fa";

function Dashboard() {
  const { user } = useAuth();

  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await API.get("/dashboard");
        setDashboard(response.data);
      } catch (error) {
        console.error("Dashboard Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  const formatCurrency = (value) => {
    return `₹${Number(value || 0).toLocaleString("en-IN")}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#111418] flex items-center justify-center text-white">
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-[#4b91e2] border-t-transparent rounded-full animate-spin mx-auto mb-4" />

          <p className="text-[#858e9b]">
            Loading your finances...
          </p>
        </div>
      </div>
    );
  }

  const summary = dashboard?.summary || {};

  const budgetPercentage = Math.min(
    Number(summary.budgetUsedPercentage || 0),
    100
  );

  return (
    <div className="min-h-screen bg-[#111418] text-[#f5f5f2]">

      <Sidebar
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />

      {/* MAIN CONTENT */}
      <main
        className="min-h-screen overflow-x-hidden transition-all duration-300"
        style={{
          marginLeft: sidebarCollapsed ? "120px" : "290px",
          width: sidebarCollapsed
            ? "calc(100% - 120px)"
            : "calc(100% - 290px)",
        }}
      >

        {/* TOP BAR */}
        <header className="h-[88px] border-b border-[#292f37] px-6 md:px-8 flex items-center justify-between">

          <div>
            <p className="text-xs text-[#68717f]">
              Financial Dashboard
            </p>

            <p className="text-sm text-[#a1a9b4] mt-1">
              Overview of your financial activity
            </p>
          </div>

          <div className="flex items-center gap-4">

            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium">
                {user?.name || "User"}
              </p>

              <p className="text-xs text-[#68717f]">
                Personal Account
              </p>
            </div>

            <div className="w-10 h-10 rounded-full bg-[#28384d] border border-[#3b4654] flex items-center justify-center text-[#6ea8ed] font-semibold">
              {(user?.name || "U").charAt(0).toUpperCase()}
            </div>

          </div>

        </header>

        {/* PAGE CONTENT */}
        <div className="w-full px-6 md:px-8 xl:px-10 py-7">

          <div className="w-full max-w-[1500px] mx-auto">

            {/* WELCOME */}
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-7">

              <div>
                <p className="text-sm text-[#737d8b] mb-2">
                  Welcome back,
                </p>

                <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
                  {user?.name || "User"} 👋
                </h1>

                <p className="text-sm text-[#737d8b] mt-2">
                  Here's what's happening with your money.
                </p>
              </div>

              <button
                onClick={() => {
                  window.location.href = "/income";
                }}
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#4b91e2] hover:bg-[#3f82cf] text-white text-sm font-semibold transition"
              >
                <FaPlus className="text-xs" />
                Add Income
              </button>

            </div>

            {/* STATS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

              {/* INCOME */}
              <div className="min-w-0 bg-[#1b2027] border border-[#2b313a] rounded-2xl p-5">

                <div className="flex items-start justify-between gap-3">

                  <div className="min-w-0">

                    <p className="text-xs text-[#788290] uppercase tracking-wide">
                      Total Income
                    </p>

                    <h2 className="text-2xl font-semibold mt-3">
                      {formatCurrency(summary.totalIncome)}
                    </h2>

                  </div>

                  <div className="shrink-0 w-9 h-9 rounded-lg bg-[#21362d] text-[#59c58b] flex items-center justify-center">
                    <FaArrowUp />
                  </div>

                </div>

                <p className="text-xs text-[#59c58b] mt-5">
                  Money received
                </p>

              </div>

              {/* EXPENSE */}
              <div className="min-w-0 bg-[#1b2027] border border-[#2b313a] rounded-2xl p-5">

                <div className="flex items-start justify-between gap-3">

                  <div className="min-w-0">

                    <p className="text-xs text-[#788290] uppercase tracking-wide">
                      Total Expenses
                    </p>

                    <h2 className="text-2xl font-semibold mt-3">
                      {formatCurrency(summary.totalExpenses)}
                    </h2>

                  </div>

                  <div className="shrink-0 w-9 h-9 rounded-lg bg-[#392527] text-[#ef7272] flex items-center justify-center">
                    <FaArrowDown />
                  </div>

                </div>

                <p className="text-xs text-[#ef7272] mt-5">
                  Money spent
                </p>

              </div>

              {/* BALANCE */}
              <div className="min-w-0 bg-[#1b2027] border border-[#2b313a] rounded-2xl p-5">

                <div className="flex items-start justify-between gap-3">

                  <div className="min-w-0">

                    <p className="text-xs text-[#788290] uppercase tracking-wide">
                      Available Balance
                    </p>

                    <h2 className="text-2xl font-semibold mt-3">
                      {formatCurrency(summary.remainingBalance)}
                    </h2>

                  </div>

                  <div className="shrink-0 w-9 h-9 rounded-lg bg-[#202f40] text-[#6ea8ed] flex items-center justify-center">
                    <FaWallet />
                  </div>

                </div>

                <p className="text-xs text-[#6ea8ed] mt-5">
                  Current balance
                </p>

              </div>

              {/* SAVINGS */}
              <div className="min-w-0 bg-[#1b2027] border border-[#2b313a] rounded-2xl p-5">

                <div className="flex items-start justify-between gap-3">

                  <div className="min-w-0">

                    <p className="text-xs text-[#788290] uppercase tracking-wide">
                      Savings Rate
                    </p>

                    <h2 className="text-2xl font-semibold mt-3">
                      {summary.savingsRate || 0}%
                    </h2>

                  </div>

                  <div className="shrink-0 w-9 h-9 rounded-lg bg-[#29263b] text-[#a88ee8] flex items-center justify-center">
                    <FaChartLine />
                  </div>

                </div>

                <p className="text-xs text-[#a88ee8] mt-5">
                  Income retained
                </p>

              </div>

            </div>

            {/* CHART + BUDGET */}
            <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1.7fr)_minmax(300px,1fr)] gap-5 mt-5">

              {/* FINANCIAL OVERVIEW */}
              <div className="min-w-0 bg-[#1b2027] border border-[#2b313a] rounded-2xl p-6">

                <div className="flex flex-wrap items-start justify-between gap-4">

                  <div>
                    <h2 className="text-lg font-semibold">
                      Financial Overview
                    </h2>

                    <p className="text-xs text-[#737d8b] mt-1">
                      Income and spending activity
                    </p>
                  </div>

                  <div className="flex items-center gap-4 text-xs">

                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#4b91e2]" />
                      Income
                    </div>

                    <div className="flex items-center gap-2 text-[#737d8b]">
                      <span className="w-2 h-2 rounded-full bg-[#59616d]" />
                      Expenses
                    </div>

                  </div>

                </div>

                <div className="relative h-[280px] mt-8 w-full overflow-hidden">

                  <div className="absolute inset-0 flex flex-col justify-between">

                    <div className="border-t border-[#272d35]" />
                    <div className="border-t border-[#272d35]" />
                    <div className="border-t border-[#272d35]" />
                    <div className="border-t border-[#272d35]" />
                    <div className="border-t border-[#272d35]" />

                  </div>

                  <svg
                    viewBox="0 0 900 280"
                    className="absolute inset-0 w-full h-full"
                    preserveAspectRatio="none"
                  >

                    <defs>

                      <linearGradient
                        id="incomeFill"
                        x1="0"
                        x2="0"
                        y1="0"
                        y2="1"
                      >

                        <stop
                          offset="0%"
                          stopColor="#4b91e2"
                          stopOpacity="0.22"
                        />

                        <stop
                          offset="100%"
                          stopColor="#4b91e2"
                          stopOpacity="0"
                        />

                      </linearGradient>

                    </defs>

                    <path
                      d="M0 220 C80 205 120 170 180 185 C250 202 280 130 350 145 C420 160 460 95 530 120 C600 145 640 80 710 105 C780 125 820 70 900 82 L900 280 L0 280 Z"
                      fill="url(#incomeFill)"
                    />

                    <path
                      d="M0 220 C80 205 120 170 180 185 C250 202 280 130 350 145 C420 160 460 95 530 120 C600 145 640 80 710 105 C780 125 820 70 900 82"
                      fill="none"
                      stroke="#4b91e2"
                      strokeWidth="3"
                    />

                    <path
                      d="M0 235 C90 230 130 215 190 220 C260 225 300 190 360 205 C430 220 470 175 530 190 C600 205 660 170 720 185 C790 198 840 165 900 175"
                      fill="none"
                      stroke="#59616d"
                      strokeWidth="2"
                    />

                  </svg>

                </div>

                <div className="flex justify-between text-[10px] text-[#68717f] mt-3">

                  <span>Week 1</span>
                  <span>Week 2</span>
                  <span>Week 3</span>
                  <span>Week 4</span>

                </div>

              </div>

              {/* MONTHLY BUDGET */}
              <div className="min-w-0 bg-[#1b2027] border border-[#2b313a] rounded-2xl p-6">

                <div className="flex items-start justify-between gap-3">

                  <div>

                    <h2 className="text-lg font-semibold">
                      Monthly Budget
                    </h2>

                    <p className="text-xs text-[#737d8b] mt-1">
                      {summary.budgetStatus || "No budget"}
                    </p>

                  </div>

                  <span className="text-xs px-3 py-1 rounded-full bg-[#21362d] text-[#59c58b] whitespace-nowrap">
                    On track
                  </span>

                </div>

                <div className="flex justify-center py-8">

                  <div
                    className="w-40 h-40 rounded-full flex items-center justify-center"
                    style={{
                      background: `conic-gradient(
                        #4b91e2 ${budgetPercentage}%,
                        #2b313a ${budgetPercentage}% 100%
                      )`,
                    }}
                  >

                    <div className="w-32 h-32 rounded-full bg-[#1b2027] flex flex-col items-center justify-center">

                      <span className="text-3xl font-semibold">
                        {Math.round(budgetPercentage)}%
                      </span>

                      <span className="text-xs text-[#737d8b]">
                        used
                      </span>

                    </div>

                  </div>

                </div>

                <div className="space-y-4">

                  <div className="flex justify-between gap-4">
                    <span className="text-xs text-[#737d8b]">
                      Monthly limit
                    </span>

                    <span className="text-sm font-medium">
                      {formatCurrency(summary.budget)}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="text-xs text-[#737d8b]">
                      Spent
                    </span>

                    <span className="text-sm font-medium">
                      {formatCurrency(summary.totalExpenses)}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="text-xs text-[#737d8b]">
                      Remaining
                    </span>

                    <span className="text-sm font-medium text-[#59c58b]">
                      {formatCurrency(summary.remainingBudget)}
                    </span>
                  </div>

                </div>

              </div>

            </div>

            {/* LOWER SECTION */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 mt-5">

              {/* TRANSACTIONS */}
              <div className="min-w-0 bg-[#1b2027] border border-[#2b313a] rounded-2xl p-6">

                <div className="flex items-center justify-between mb-6">

                  <div>
                    <h2 className="text-lg font-semibold">
                      Recent Transactions
                    </h2>

                    <p className="text-xs text-[#737d8b] mt-1">
                      Your latest expenses
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      window.location.href = "/expense";
                    }}
                    className="text-xs text-[#6ea8ed] hover:text-white transition"
                  >
                    View all
                  </button>

                </div>

                {dashboard?.recentExpenses?.length > 0 ? (

                  <div className="space-y-3">

                    {dashboard.recentExpenses.map((expense) => (

                      <div
                        key={expense._id}
                        className="flex items-center justify-between gap-4 p-4 rounded-xl bg-[#15191e] border border-[#252b33]"
                      >

                        <div className="flex items-center gap-3 min-w-0">

                          <div className="shrink-0 w-9 h-9 rounded-lg bg-[#392527] text-[#ef7272] flex items-center justify-center">
                            <FaArrowDown className="text-xs" />
                          </div>

                          <div className="min-w-0">

                            <p className="text-sm font-medium truncate">
                              {expense.title}
                            </p>

                            <p className="text-[11px] text-[#737d8b] mt-1">
                              {expense.category}
                            </p>

                          </div>

                        </div>

                        <p className="text-sm font-medium whitespace-nowrap">
                          -{formatCurrency(expense.amount)}
                        </p>

                      </div>

                    ))}

                  </div>

                ) : (

                  <div className="py-10 text-center">

                    <p className="text-sm text-[#737d8b]">
                      No expenses yet.
                    </p>

                  </div>

                )}

              </div>

              {/* CATEGORY */}
              <div className="min-w-0 bg-[#1b2027] border border-[#2b313a] rounded-2xl p-6">

                <h2 className="text-lg font-semibold">
                  Spending by Category
                </h2>

                <p className="text-xs text-[#737d8b] mt-1 mb-7">
                  Breakdown of your expenses
                </p>

                {dashboard?.categoryBreakdown?.length > 0 ? (

                  <div className="space-y-6">

                    {dashboard.categoryBreakdown.map((category) => {

                      const percentage =
                        summary.totalExpenses > 0
                          ? (category.total /
                              summary.totalExpenses) *
                            100
                          : 0;

                      return (
                        <div key={category._id}>

                          <div className="flex justify-between mb-2">

                            <span className="text-sm">
                              {category._id}
                            </span>

                            <span className="text-xs text-[#858e9b]">
                              {formatCurrency(category.total)}
                            </span>

                          </div>

                          <div className="h-1.5 bg-[#15191e] rounded-full overflow-hidden">

                            <div
                              className="h-full bg-[#4b91e2] rounded-full"
                              style={{
                                width: `${percentage}%`,
                              }}
                            />

                          </div>

                        </div>
                      );
                    })}

                  </div>

                ) : (

                  <p className="text-sm text-[#737d8b]">
                    No category data available.
                  </p>

                )}

              </div>

            </div>

            {/* AI INSIGHTS */}
            <div id="ai" className="mt-5">
              <AIInsights />
            </div>

          </div>

        </div>

      </main>

    </div>
  );
}

export default Dashboard;
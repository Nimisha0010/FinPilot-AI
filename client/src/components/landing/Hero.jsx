import { Link } from "react-router-dom";
import { FaArrowRight, FaChartPie, FaRobot } from "react-icons/fa";

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-[var(--primary)] opacity-10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500 opacity-10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-14 items-center">

        {/* Left Side */}
        <div>

          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--card)] border border-[var(--border)] text-sm text-[var(--text-secondary)]">
            <FaRobot className="text-[var(--primary)]" />
            AI Powered Personal Finance
          </span>

          <h1 className="mt-8 text-5xl lg:text-7xl font-extrabold leading-tight">
            Take Control of
            <span className="block text-[var(--primary)]">
              Your Finances
            </span>
          </h1>

          <p className="mt-8 text-lg text-[var(--text-secondary)] leading-8 max-w-xl">
            Track expenses, manage budgets, analyze income, and receive
            personalized AI-powered financial insights—all in one place.
          </p>

          <div className="mt-10 flex flex-wrap gap-5">

            <Link
              to="/register"
              className="flex items-center gap-2 px-8 py-4 rounded-xl bg-[var(--primary)] hover:bg-[var(--primary-hover)] transition font-semibold"
            >
              Get Started

              <FaArrowRight />
            </Link>

            <Link
              to="/login"
              className="px-8 py-4 rounded-xl border border-[var(--border)] hover:bg-[var(--card)] transition"
            >
              Login
            </Link>

          </div>

        </div>

        {/* Right Side */}
        <div className="flex justify-center">

          <div className="w-full max-w-md rounded-3xl bg-[var(--card)] border border-[var(--border)] p-8 shadow-2xl">

            <div className="flex items-center gap-3 mb-8">

              <div className="h-12 w-12 rounded-xl bg-[var(--primary)] flex items-center justify-center">

                <FaChartPie className="text-white text-xl" />

              </div>

              <div>

                <h3 className="font-bold text-xl">
                  FinPilot AI
                </h3>

                <p className="text-sm text-[var(--text-secondary)]">
                  Smart Finance Dashboard
                </p>

              </div>

            </div>

            <div className="space-y-5">

              <div className="bg-[var(--surface)] rounded-xl p-5">

                <p className="text-[var(--text-secondary)] text-sm">
                  Total Balance
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  ₹65,251
                </h2>

              </div>

              <div className="grid grid-cols-2 gap-4">

                <div className="bg-[var(--surface)] rounded-xl p-4">

                  <p className="text-sm text-[var(--text-secondary)]">
                    Income
                  </p>

                  <h3 className="text-xl font-bold mt-2 text-green-400">
                    ₹74,200
                  </h3>

                </div>

                <div className="bg-[var(--surface)] rounded-xl p-4">

                  <p className="text-sm text-[var(--text-secondary)]">
                    Expenses
                  </p>

                  <h3 className="text-xl font-bold mt-2 text-red-400">
                    ₹8,949
                  </h3>

                </div>

              </div>

              <div className="bg-[var(--surface)] rounded-xl p-5">

                <p className="text-sm text-[var(--text-secondary)]">
                  AI Insight
                </p>

                <p className="mt-3 text-sm leading-6">
                  You have saved <span className="text-[var(--primary)] font-semibold">88%</span> of
                  your income this month. Great job maintaining your budget!
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;
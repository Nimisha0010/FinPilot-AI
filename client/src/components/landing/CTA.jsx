import { Link } from "react-router-dom";

function CTA() {
  return (
    <section className="py-28 px-6">
      <div className="max-w-5xl mx-auto bg-[var(--card)] border border-[var(--border)] rounded-3xl p-12 text-center">

        <h2 className="text-5xl font-bold">
          Start Managing Your
          <span className="text-[var(--primary)]">
            {" "}Finances Today
          </span>
        </h2>

        <p className="mt-6 text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
          Join FinPilot AI to track expenses, manage budgets, analyze income,
          and receive personalized AI-powered financial insights.
        </p>

        <Link
          to="/register"
          className="inline-block mt-10 px-8 py-4 bg-[var(--primary)] hover:bg-[var(--primary-hover)] rounded-xl font-semibold transition"
        >
          Get Started Free
        </Link>

      </div>
    </section>
  );
}

export default CTA;
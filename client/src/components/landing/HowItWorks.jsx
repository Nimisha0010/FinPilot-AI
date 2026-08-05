import {
  FaUserPlus,
  FaWallet,
  FaBullseye,
  FaRobot,
} from "react-icons/fa";

const steps = [
  {
    icon: <FaUserPlus />,
    title: "Create Your Account",
    description:
      "Register securely and access your personal finance dashboard in seconds.",
  },
  {
    icon: <FaWallet />,
    title: "Track Income & Expenses",
    description:
      "Record transactions, categorize spending, and monitor your financial activity.",
  },
  {
    icon: <FaBullseye />,
    title: "Set Monthly Budgets",
    description:
      "Define monthly spending limits and keep your finances under control.",
  },
  {
    icon: <FaRobot />,
    title: "Get AI Insights",
    description:
      "Receive personalized recommendations and actionable financial advice powered by AI.",
  },
];

function HowItWorks() {
  return (
    <section
      id="how"
      className="py-28 px-6 bg-[var(--surface)]"
    >
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto">

          <h2 className="text-5xl font-bold">
            How
            <span className="text-[var(--primary)]">
              {" "}FinPilot AI{" "}
            </span>
            Works
          </h2>

          <p className="mt-6 text-lg text-[var(--text-secondary)]">
            Start managing your finances in just four simple steps.
          </p>

        </div>

        {/* Timeline */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">

          {steps.map((step, index) => (
            <div
              key={index}
              className="relative bg-[var(--card)] border border-[var(--border)] rounded-2xl p-8 hover:border-[var(--primary)] transition-all duration-300"
            >

              {/* Step Number */}
              <div className="absolute -top-5 left-8 w-10 h-10 rounded-full bg-[var(--primary)] text-white flex items-center justify-center font-bold">
                {index + 1}
              </div>

              {/* Icon */}
              <div className="text-4xl text-[var(--primary)] mt-6">
                {step.icon}
              </div>

              {/* Title */}
              <h3 className="mt-6 text-2xl font-semibold">
                {step.title}
              </h3>

              {/* Description */}
              <p className="mt-4 text-[var(--text-secondary)] leading-7">
                {step.description}
              </p>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default HowItWorks;
import {
  FaWallet,
  FaChartLine,
  FaBullseye,
  FaRobot,
} from "react-icons/fa";

const features = [
  {
    icon: <FaWallet className="text-3xl text-[var(--primary)]" />,
    title: "Expense Tracking",
    description:
      "Record and organize daily expenses with categories, notes, and detailed transaction history.",
  },
  {
    icon: <FaChartLine className="text-3xl text-[var(--primary)]" />,
    title: "Income Management",
    description:
      "Monitor multiple income sources and gain a clear understanding of your monthly cash flow.",
  },
  {
    icon: <FaBullseye className="text-3xl text-[var(--primary)]" />,
    title: "Smart Budgeting",
    description:
      "Set monthly budgets, monitor spending, and stay within your financial goals effortlessly.",
  },
  {
    icon: <FaRobot className="text-3xl text-[var(--primary)]" />,
    title: "AI Insights",
    description:
      "Receive personalized financial recommendations powered by AI based on your spending habits.",
  },
];

function Features() {
  return (
    <section
      id="features"
      className="py-28 px-6"
    >
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto">

          <h2 className="text-5xl font-bold">
            Everything You Need To
            <span className="block text-[var(--primary)] mt-2">
              Manage Your Finances
            </span>
          </h2>

          <p className="mt-6 text-lg text-[var(--text-secondary)]">
            FinPilot AI combines expense tracking, budgeting,
            analytics, and artificial intelligence into one
            seamless platform.
          </p>

        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">

          {features.map((feature, index) => (
            <div
              key={index}
              className="
                bg-[var(--card)]
                border
                border-[var(--border)]
                rounded-2xl
                p-8
                transition-all
                duration-300
                hover:-translate-y-2
                hover:border-[var(--primary)]
                hover:shadow-xl
              "
            >

              <div className="mb-6">
                {feature.icon}
              </div>

              <h3 className="text-2xl font-semibold mb-4">
                {feature.title}
              </h3>

              <p className="text-[var(--text-secondary)] leading-7">
                {feature.description}
              </p>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Features;
import { FaStar } from "react-icons/fa";

const testimonials = [
  {
    name: "Budget Control",
    role: "Smarter Spending",
    review:
      "Monitor every expense in one place and stay within your monthly budget with confidence.",
  },
  {
    name: "AI Insights",
    role: "Personalized Advice",
    review:
      "Receive intelligent recommendations based on your spending patterns and financial habits.",
  },
  {
    name: "Financial Growth",
    role: "Better Decisions",
    review:
      "Understand where your money goes and make informed financial decisions using analytics.",
  },
];

function Testimonials() {
  return (
    <section
      id="testimonials"
      className="py-28 px-6"
    >
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto">

          <h2 className="text-5xl font-bold">
            Why You'll Love
            <span className="text-[var(--primary)]">
              {" "}FinPilot AI
            </span>
          </h2>

          <p className="mt-6 text-lg text-[var(--text-secondary)]">
            Built to help you manage money with clarity, confidence, and AI-powered guidance.
          </p>

        </div>

        {/* Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mt-20">

          {testimonials.map((item, index) => (
            <div
              key={index}
              className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-8 hover:border-[var(--primary)] transition-all duration-300"
            >

              {/* Stars */}
              <div className="flex gap-1 text-yellow-400 mb-6">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>

              {/* Review */}
              <p className="text-[var(--text-secondary)] leading-7">
                "{item.review}"
              </p>

              {/* Footer */}
              <div className="mt-8">
                <h3 className="font-semibold text-lg">
                  {item.name}
                </h3>

                <p className="text-sm text-[var(--text-secondary)]">
                  {item.role}
                </p>
              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Testimonials;
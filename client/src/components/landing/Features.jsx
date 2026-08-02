const features = [
  {
    title: "Expense Tracking",
    description: "Monitor every expense and understand where your money goes."
  },
  {
    title: "Budget Planning",
    description: "Create monthly budgets and stay within your financial goals."
  },
  {
    title: "AI Financial Advisor",
    description: "Receive intelligent recommendations based on your spending habits."
  },
  {
    title: "Analytics Dashboard",
    description: "Visualize income, expenses and savings using beautiful charts."
  }
];

function Features() {
  return (
    <section className="bg-white py-24 px-6">
      <div className="max-w-7xl mx-auto">

        <h2 className="text-4xl font-bold text-center">
          Why Choose FinPilot AI?
        </h2>

        <p className="text-center text-gray-600 mt-4">
          Everything you need to manage your finances in one platform.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">

          {features.map((feature, index) => (
            <div
              key={index}
              className="rounded-2xl shadow-lg p-8 hover:shadow-2xl transition"
            >
              <h3 className="text-2xl font-semibold mb-4">
                {feature.title}
              </h3>

              <p className="text-gray-600">
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
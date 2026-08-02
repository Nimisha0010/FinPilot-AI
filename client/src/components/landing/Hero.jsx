function Hero() {
  return (
    <section className="min-h-[90vh] bg-slate-900 text-white flex items-center justify-center px-6">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-10 items-center">

        {/* Left Side */}
        <div>
          <p className="text-blue-400 font-semibold uppercase tracking-wider">
            AI Powered Personal Finance
          </p>

          <h1 className="text-5xl font-bold mt-4 leading-tight">
            Manage Your Money Smarter with
            <span className="text-blue-500"> FinPilot AI</span>
          </h1>

          <p className="text-gray-300 mt-6 text-lg leading-8">
            Track your income, monitor expenses, create budgets,
            visualize insights, and receive AI-powered financial advice—
            all in one intelligent platform.
          </p>

          <div className="flex gap-4 mt-8">
            <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-semibold">
              Get Started
            </button>

            <button className="border border-gray-500 hover:border-blue-500 px-6 py-3 rounded-xl">
              Learn More
            </button>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex justify-center">
          <div className="w-96 h-96 rounded-3xl bg-gradient-to-br from-blue-600 to-cyan-400 shadow-2xl flex items-center justify-center text-3xl font-bold">
            Dashboard Preview
          </div>
        </div>

      </div>
    </section>
  );
}

export default Hero;
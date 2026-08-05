import { Link } from "react-router-dom";
import { FaChartLine } from "react-icons/fa";

function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[var(--background)]/90 backdrop-blur-lg border-b border-[var(--border)]">
      <div className="max-w-7xl mx-auto h-20 px-6 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3"
        >
          <div className="h-11 w-11 rounded-xl bg-[var(--primary)] flex items-center justify-center shadow-lg">
            <FaChartLine className="text-white text-lg" />
          </div>

          <div>
            <h1 className="text-xl font-bold text-[var(--text-primary)]">
              FinPilot AI
            </h1>

            <p className="text-xs text-[var(--text-secondary)]">
              Personal Finance Manager
            </p>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="hidden lg:flex items-center gap-10">

          <a
            href="#features"
            className="text-[var(--text-secondary)] hover:text-[var(--primary)] transition"
          >
            Features
          </a>

          <a
            href="#how"
            className="text-[var(--text-secondary)] hover:text-[var(--primary)] transition"
          >
            How It Works
          </a>

          <a
            href="#testimonials"
            className="text-[var(--text-secondary)] hover:text-[var(--primary)] transition"
          >
            Testimonials
          </a>

        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">

          <Link
            to="/login"
            className="text-[var(--text-secondary)] hover:text-white transition"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="px-5 py-2.5 rounded-xl bg-[var(--primary)] hover:bg-[var(--primary-hover)] transition text-white font-semibold"
          >
            Get Started
          </Link>

        </div>
      </div>
    </header>
  );
}

export default Navbar;
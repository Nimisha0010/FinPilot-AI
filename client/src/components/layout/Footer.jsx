function Footer() {
  return (
    <footer className="border-t border-[var(--border)] py-8">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">

        <h2 className="text-lg font-semibold">
          FinPilot AI
        </h2>

        <p className="text-[var(--text-secondary)] text-sm">
          © {new Date().getFullYear()} FinPilot AI. All rights reserved.
        </p>

      </div>
    </footer>
  );
}

export default Footer;
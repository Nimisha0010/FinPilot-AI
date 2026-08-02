function Navbar() {
  return (
    <nav className="w-full bg-slate-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">

        {/* Logo */}
        <h1 className="text-2xl font-bold text-blue-500">
          FinPilot AI
        </h1>

        {/* Navigation Links */}
        <ul className="flex gap-8 text-lg">
          <li className="cursor-pointer hover:text-blue-400">Features</li>
          <li className="cursor-pointer hover:text-blue-400">Analytics</li>
          <li className="cursor-pointer hover:text-blue-400">AI Advisor</li>
          <li className="cursor-pointer hover:text-blue-400">About</li>
        </ul>

        {/* Login Button */}
        <button className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg font-semibold">
          Login
        </button>

      </div>
    </nav>
  );
}

export default Navbar;
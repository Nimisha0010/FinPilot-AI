import { NavLink } from "react-router-dom";
import {
  FaChartPie,
  FaWallet,
  FaMoneyBillWave,
  FaBullseye,
  FaRobot,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";

function Sidebar({ collapsed, setCollapsed }) {
  const links = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <FaChartPie />,
    },
    {
      name: "Income",
      path: "/income",
      icon: <FaMoneyBillWave />,
    },
    {
      name: "Expenses",
      path: "/expense",
      icon: <FaWallet />,
    },
    {
      name: "Budget",
      path: "/budget",
      icon: <FaBullseye />,
    },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {!collapsed && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setCollapsed(true)}
        />
      )}

      <aside
        className={`
          fixed
          left-0
          top-0
          bottom-0
          z-50
          bg-[#181c22]
          border-r
          border-[#2b313a]
          flex
          flex-col
          transition-all
          duration-300
          ease-in-out
          ${
            collapsed
              ? "w-[84px]"
              : "w-[250px]"
          }
        `}
      >

        {/* LOGO */}
        <div
          className={`
            h-[88px]
            border-b
            border-[#2b313a]
            flex
            items-center
            ${
              collapsed
                ? "justify-center"
                : "justify-between px-5"
            }
          `}
        >

          {collapsed ? (
            <div className="w-10 h-10 rounded-xl bg-[#4b91e2] flex items-center justify-center text-white font-semibold">
              FP
            </div>
          ) : (
            <div className="flex items-center gap-3">

              <div className="w-10 h-10 rounded-xl bg-[#4b91e2] flex items-center justify-center text-white font-semibold">
                FP
              </div>

              <div>

                <h1 className="text-[17px] font-bold text-[#f5f5f2]">
                  FinPilot
                </h1>

                <p className="text-[11px] text-[#7f8997]">
                  AI Finance
                </p>

              </div>

            </div>
          )}

        </div>

        {/* TOGGLE */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          title={collapsed ? "Open sidebar" : "Close sidebar"}
          className="
            absolute
            -right-3
            top-[100px]
            w-7
            h-7
            rounded-full
            bg-[#28384d]
            border
            border-[#3b4654]
            text-[#aeb7c4]
            hover:text-white
            flex
            items-center
            justify-center
            z-[60]
            shadow-lg
          "
        >
          {collapsed ? (
            <FaBars size={11} />
          ) : (
            <FaTimes size={11} />
          )}
        </button>

        {/* NAVIGATION */}
        <div className="px-3 py-7">

          {!collapsed && (
            <p className="px-3 mb-4 text-[10px] uppercase tracking-[0.18em] text-[#68717f]">
              Overview
            </p>
          )}

          <nav className="space-y-1">

            {links.map((link) => (

              <NavLink
                key={link.name}
                to={link.path}
                title={collapsed ? link.name : ""}
                className={({ isActive }) =>
                  `
                  flex
                  items-center
                  ${
                    collapsed
                      ? "justify-center"
                      : "gap-3"
                  }
                  px-3
                  py-3
                  rounded-xl
                  text-sm
                  transition-all
                  ${
                    isActive
                      ? "bg-[#28384d] text-[#6ea8ed]"
                      : "text-[#909aa8] hover:bg-[#21262e] hover:text-[#f5f5f2]"
                  }
                  `
                }
              >

                <span className="text-[15px] w-5 flex justify-center">
                  {link.icon}
                </span>

                {!collapsed && (
                  <span>
                    {link.name}
                  </span>
                )}

              </NavLink>

            ))}

          </nav>

        </div>

        {/* AI */}
        <div className="px-3">

          {!collapsed && (
            <p className="px-3 mb-4 text-[10px] uppercase tracking-[0.18em] text-[#68717f]">
              Intelligence
            </p>
          )}

          <NavLink
            to="/dashboard#ai"
            title={collapsed ? "AI Insights" : ""}
            className={`
              flex
              items-center
              ${
                collapsed
                  ? "justify-center"
                  : "gap-3"
              }
              px-3
              py-3
              rounded-xl
              text-sm
              text-[#909aa8]
              hover:bg-[#21262e]
              hover:text-[#f5f5f2]
              transition
            `}
          >

            <span className="w-5 flex justify-center">
              <FaRobot />
            </span>

            {!collapsed && (
              <span>
                AI Insights
              </span>
            )}

          </NavLink>

        </div>

        {/* BOTTOM */}
        <div className="mt-auto p-3 border-t border-[#2b313a]">

          <button
            title={collapsed ? "Settings" : ""}
            className={`
              w-full
              flex
              items-center
              ${
                collapsed
                  ? "justify-center"
                  : "gap-3"
              }
              px-3
              py-3
              rounded-xl
              text-sm
              text-[#909aa8]
              hover:bg-[#21262e]
              hover:text-white
              transition
            `}
          >

            <span className="w-5 flex justify-center">
              <FaCog />
            </span>

            {!collapsed && "Settings"}

          </button>

          <button
            title={collapsed ? "Logout" : ""}
            className={`
              w-full
              flex
              items-center
              ${
                collapsed
                  ? "justify-center"
                  : "gap-3"
              }
              px-3
              py-3
              rounded-xl
              text-sm
              text-[#909aa8]
              hover:bg-[#21262e]
              hover:text-white
              transition
            `}
          >

            <span className="w-5 flex justify-center">
              <FaSignOutAlt />
            </span>

            {!collapsed && "Logout"}

          </button>

        </div>

      </aside>
    </>
  );
}

export default Sidebar;
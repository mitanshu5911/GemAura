import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
const Header = () => {
  const { logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const navItems = [
    { name: "Home", path: "/" },
    { name: "History", path: "/history" },
    { name: "About Us", path: "/about" },
    // { name: "Settings", path: "/settings" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200/80 bg-[#FCFBF8]/95 backdrop-blur-md">
      <div className="mx-auto flex h-18 max-w-[1400px] items-center justify-between px-8">
        <Link
          to="/"
          className="group flex flex-col justify-center select-none"
        >
          <h1 className="text-3xl font-black leading-none tracking-tight">
            <span className="text-slate-800">Gem</span>
            <span className="bg-gradient-to-r from-amber-700 via-yellow-600 to-amber-500 bg-clip-text text-transparent">
              Aura
            </span>
          </h1>

          <div className="mt-1 flex items-center gap-3">
            <div className="h-[2px] w-8 bg-amber-600 transition-all duration-500 group-hover:w-14" />

            <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-stone-500">
              AI Recommendation
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `group relative pb-2 text-[15px] transition-all duration-300 ${
                  isActive
                    ? "font-semibold text-amber-700"
                    : "font-medium text-slate-600 hover:text-slate-900"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {item.name}

                  <span
                    className={`absolute bottom-0 left-1/2 h-[2px] bg-amber-700 transition-all duration-300 ease-out ${
                      isActive
                        ? "w-full -translate-x-1/2"
                        : "w-0 -translate-x-1/2 group-hover:w-full"
                    }`}
                  />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {!isAuthenticated ? (
          <button
            onClick={() => navigate("/login")}
           className="
rounded-md
border
border-amber-700
px-5
py-2.5
text-sm
font-medium
text-amber-700
transition-all
duration-300
hover:bg-amber-700
hover:text-white
"
          >
            Login
          </button>
        ) : (
          <button
            onClick={logout}
            className="
rounded-md
border
border-stone-300
px-5
py-2.5
text-sm
font-medium
text-slate-700
transition-all
duration-300
hover:border-stone-400
hover:bg-stone-100
"
          >
            Logout
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;


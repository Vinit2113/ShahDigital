import React from "react";
import { Menu } from "lucide-react";
import logo from "../../assets/Logo_shahdigital_no_bg.png";
import adminNavbarHook from "../hooks/adminNavbarHooks";
import { useNavigate } from "react-router";

const AdminNavbar = ({ onMenuClick }) => {
  const admin = adminNavbarHook();
  const navigate = useNavigate();
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-white border-b border-gray-200">
      <div className="h-full px-3 sm:px-8 flex items-center justify-between">
        {/* LEFT - Logo + Brand */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Sidebar toggle - mobile/tablet only, sidebar is always visible at md+ */}
          <button
            type="button"
            onClick={onMenuClick}
            className="md:hidden p-2 -ml-1 rounded-md hover:bg-gray-100 transition text-gray-700"
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>

          <div className="pr-2 sm:pr-4 border-r border-gray-200">
            <img src={logo} alt="Logo" className="h-8 sm:h-9 w-auto object-contain" />
          </div>

          <div className="hidden sm:block leading-tight">
            <p className="text-[11px] tracking-widest text-gray-400 uppercase">
              Control Center
            </p>
            <p className="text-sm font-semibold text-gray-900">
              Admin Dashboard
            </p>
          </div>
        </div>

        {/* CENTER */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-md bg-gray-50 border border-gray-200">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-sm text-gray-700 font-medium">
            All Systems Operational
          </span>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3">
          <button className="relative p-2 rounded-md hover:bg-gray-100 transition">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.8}
              stroke="currentColor"
              className="w-5 h-5 text-gray-700"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.857 17.082a3 3 0 01-5.714 0M18 8a6 6 0 10-12 0c0 7-3 7-3 7h18s-3 0-3-7z"
              />
            </svg>

            <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full ring-2 ring-white"></span>
          </button>

          <div
            onClick={() => navigate("/admin/profile")}
            className="flex items-center gap-3 px-2 py-1.5 rounded-md hover:bg-gray-100 transition cursor-pointer"
          >
            <div className="h-9 w-9 rounded-md bg-gray-900 text-white flex items-center justify-center font-semibold">
              {admin?.name?.charAt(0) || "A"}
            </div>

            <div className="hidden sm:block leading-tight">
              <p className="text-sm font-semibold text-gray-900">
                {admin?.name || "Admin"}
              </p>
              <p className="text-[11px] text-gray-500">
                {admin?.role || "Admin"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;

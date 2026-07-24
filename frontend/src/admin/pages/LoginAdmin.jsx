import React from "react";
import {
  Mail,
  Lock,
  ShieldCheck,
  Eye,
  EyeOff,
  LogIn,
  UserPlus,
} from "lucide-react";

import logo from "../../assets/Logo_shahdigital_no_bg.png";
import { useNavigate } from "react-router";
import adminLoginHook from "../hooks/adminLoginHooks";

const LoginAdmin = () => {
  const {
    formData,
    handleChange,
    handleSubmit,
    loading,
    showPassword,
    setShowPassword,
  } = adminLoginHook();

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-6 sm:py-10">
      {/* FIX: was "h-screen ... overflow-hidden" with "max-h-[90vh]" - on
          mobile the grid collapses to a single column, stacking the
          company panel on top of the login form inside a viewport-height
          clipped box, so the actual login form was cut off and
          unreachable on small screens. min-h-screen + natural scroll and
          only capping height at md+ (where the two columns sit side by
          side) fixes that. */}
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden grid md:grid-cols-2 md:max-h-[90vh]">
        {/* ================= LEFT COMPANY SECTION ================= */}

        <div className="bg-gray-900 text-white p-6 flex flex-col justify-center">
          <div className="mb-8 inline-flex bg-white rounded-xl p-3">
            <img
              src={logo}
              alt="Shah Digital Logo"
              className="h-10 w-auto object-contain"
            />
          </div>

          <p className="text-xs tracking-[0.3em] uppercase text-gray-400">
            Shah Digital
          </p>

          <h1 className="text-2xl font-bold leading-tight mt-2">
            Welcome Back To Your Digital Control Center
          </h1>

          <p className="text-xs text-gray-300 leading-6 mt-3">
            Access your admin dashboard securely and manage your digital
            operations with powerful tools built for modern businesses.
          </p>

          <div className="mt-5 space-y-3">
            <div className="flex gap-3">
              <div className="h-8 w-8 rounded-lg bg-white/10 flex items-center justify-center">
                <ShieldCheck size={18} />
              </div>

              <div>
                <h3 className="text-sm font-medium">Secure Login</h3>

                <p className="text-xs text-gray-400 mt-1">
                  Protected authentication system.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="h-8 w-8 rounded-lg bg-white/10 flex items-center justify-center">
                <Lock size={18} />
              </div>

              <div>
                <h3 className="text-sm font-medium">Data Security</h3>

                <p className="text-xs text-gray-400 mt-1">
                  Your admin access stays protected.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="h-8 w-8 rounded-lg bg-white/10 flex items-center justify-center">
                <LogIn size={18} />
              </div>

              <div>
                <h3 className="text-sm font-medium">Fast Access</h3>

                <p className="text-xs text-gray-400 mt-1">
                  Quickly access your dashboard.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-white/10">
            <p className="text-xs text-gray-400">
              © {new Date().getFullYear()} Shah Digital. All rights reserved.
            </p>
          </div>
        </div>

        {/* ================= LOGIN SECTION ================= */}

        <div className="p-5 flex items-center">
          <div className="w-full max-w-md mx-auto">
            {/* HEADER */}

            <div className="text-center mb-4">
              <p className="text-xs tracking-widest text-gray-400 uppercase">
                Control Center
              </p>

              <h1 className="text-2xl font-bold text-gray-900 mt-1">
                Admin Login
              </h1>

              <p className="text-sm text-gray-500 mt-2">
                Sign in to access your dashboard
              </p>
            </div>

            {/* LOGIN / REGISTER TABS */}

            <div className="flex bg-gray-100 rounded-xl p-1 mb-4">
              <button
                type="button"
                className="flex-1 rounded-lg py-2 text-sm font-medium bg-white text-gray-900 shadow-sm cursor-default"
              >
                Login
              </button>

              <button
                type="button"
                onClick={() => navigate("/admin/register")}
                className="flex-1 rounded-lg py-2 text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
              >
                Register
              </button>
            </div>

            {/* LOGIN CARD */}

            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
              <form onSubmit={handleSubmit} className="space-y-3">
                {/* EMAIL */}

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Email Address
                  </label>

                  <div className="relative mt-2">
                    <Mail
                      size={18}
                      className="absolute left-3 top-3 text-gray-400"
                    />

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="admin@example.com"
                      className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-gray-900 transition"
                    />
                  </div>
                </div>

                {/* PASSWORD */}

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Password
                  </label>

                  <div className="relative mt-2">
                    <Lock
                      size={18}
                      className="absolute left-3 top-3 text-gray-400"
                    />

                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-gray-900 transition"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-4 text-gray-400 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {/* REMEMBER */}

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-sm text-gray-600">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                    />
                    Remember me
                  </label>

                  <button
                    type="button"
                    className="text-sm text-gray-900 hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>

                {/* BUTTON */}

                <button
                  type="submit"
                  disabled={loading}
                  className="
                    w-full flex items-center justify-center gap-2
                    bg-gray-900 text-white
                    py-3 rounded-lg
                    hover:bg-black
                    transition
                    active:scale-[0.98]
                    disabled:opacity-60
                  "
                >
                  <LogIn size={18} />

                  {loading ? "Signing In..." : "Login"}
                </button>
              </form>

              <div className="mt-6 pt-4 border-t text-center">
                <p className="text-xs text-gray-400">
                  Admin Dashboard Security System
                </p>
              </div>
            </div>

            {/* SECURITY BADGE */}

            <div className="mt-5 flex justify-center">
              <div className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>

                <span className="text-xs text-gray-600">
                  Secure Login Enabled
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginAdmin;

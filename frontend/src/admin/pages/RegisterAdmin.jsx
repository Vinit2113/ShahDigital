import React from "react";
import {
  UserPlus,
  Mail,
  Lock,
  User,
  ShieldCheck,
  Eye,
  EyeOff,
} from "lucide-react";

import logo from "../../assets/Logo_shahdigital_no_bg.png";
import { useNavigate } from "react-router";
import adminRegisterHook from "../hooks/adminRegisterHooks";

const RegisterAdmin = () => {
  const {
    formData,
    handleChange,
    handleSubmit,
    loading,
    showPassword,
    setShowPassword,
  } = adminRegisterHook();

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-6 sm:py-10">
      {/* FIX: same clipped-viewport bug as LoginAdmin.jsx - "h-screen
          overflow-hidden" + "max-h-[90vh]" cut off the actual register form
          on mobile, where the grid stacks to a single column. */}
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
            Build, Manage & Grow Your Digital Business
          </h1>

          <p className="text-xs text-gray-300 leading-6 mt-3">
            Shah Digital provides modern digital solutions designed to simplify
            business operations. Our secure admin systems help teams manage
            their platforms efficiently with powerful tools and reliable
            security.
          </p>

          <div className="mt-5 space-y-3">
            <div className="flex gap-3">
              <div className="h-8 w-8 rounded-lg bg-white/10 flex items-center justify-center">
                <ShieldCheck size={18} />
              </div>

              <div>
                <h3 className="text-sm font-medium">Secure Platform</h3>

                <p className="text-xs text-gray-400 mt-1">
                  Protected authentication and admin access control.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="h-8 w-8 rounded-lg bg-white/10 flex items-center justify-center">
                <UserPlus size={18} />
              </div>

              <div>
                <h3 className="text-sm font-medium">Easy Management</h3>

                <p className="text-xs text-gray-400 mt-1">
                  Simple dashboard experience for administrators.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="h-8 w-8 rounded-lg bg-white/10 flex items-center justify-center">
                <Lock size={18} />
              </div>

              <div>
                <h3 className="text-sm font-medium">Data Protection</h3>

                <p className="text-xs text-gray-400 mt-1">
                  Security-focused system architecture.
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

        {/* ================= RIGHT REGISTER SECTION ================= */}

        <div className="p-5 flex items-center">
          <div className="w-full max-w-md mx-auto">
            {/* HEADER */}

            <div className="text-center mb-4">
              <p className="text-xs tracking-widest text-gray-400 uppercase">
                Control Center
              </p>

              <h1 className="text-2xl font-bold text-gray-900 mt-1">
                Create Admin Account
              </h1>

              <p className="text-sm text-gray-500 mt-2">
                Register a new administrator for your dashboard
              </p>
            </div>

            {/* LOGIN / REGISTER TABS */}

            <div className="flex bg-gray-100 rounded-xl p-1 mb-4">
              <button
                type="button"
                onClick={() => navigate("/admin/login")}
                className="flex-1 rounded-lg py-2 text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
              >
                Login
              </button>

              <button
                type="button"
                className="flex-1 rounded-lg py-2 text-sm font-medium bg-white text-gray-900 shadow-sm cursor-default"
              >
                Register
              </button>
            </div>

            {/* REGISTER CARD */}

            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
              <form onSubmit={handleSubmit} className="space-y-3">
                {/* NAME */}

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Full Name
                  </label>

                  <div className="relative mt-2">
                    <User
                      size={18}
                      className="absolute left-3 top-3 text-gray-400"
                    />

                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Admin Name"
                      className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-gray-900 transition"
                    />
                  </div>
                </div>

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

                {/* CONFIRM PASSWORD */}

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Confirm Password
                  </label>

                  <div className="relative mt-2">
                    <ShieldCheck
                      size={18}
                      className="absolute left-3 top-3 text-gray-400"
                    />

                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm password"
                      className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-gray-900 transition"
                    />
                  </div>
                </div>

                {/* AGREEMENT */}

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    name="agreement"
                    checked={formData.agreement}
                    onChange={handleChange}
                    className="mt-1 h-4 w-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                  />

                  <label className="text-sm text-gray-600">
                    I agree to the{" "}
                    <a
                      href="/terms"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-gray-900 hover:underline"
                    >
                      Terms & Conditions
                    </a>{" "}
                    and{" "}
                    <a
                      href="/privacy-policy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-gray-900 hover:underline"
                    >
                      Privacy Policy
                    </a>
                  </label>
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
                    cursor-pointer
                    active:scale-[0.98]
                    disabled:opacity-60
                  "
                >
                  <UserPlus size={18} />

                  {loading ? "Creating Account..." : "Create Account"}
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
                  Secure Registration Enabled
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterAdmin;

import React, { useState } from "react";
import { UserPlus, Mail, Lock, User, ShieldCheck } from "lucide-react";
import logo from "../../assets/Logo_shahdigital_no_bg.png";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router";

const baseURL = import.meta.env.VITE_BACKEND_URL;

const RegisterAdmin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreement: false,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return toast.error("Password do not match");
    }

    if (!formData.agreement) {
      return toast.error("Please accept Terms & Conditions");
    }

    const adminData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    };

    try {
      setLoading(true);

      const res = await axios.post(
        `${baseURL}auth/admin-auth-register`,
        adminData,
        {
          withCredentials: true,
        },
      );

      toast.success("Admin created successfully");
      navigate("/admin");
    } catch (error) {
      console.log(error);

      return toast.error(error.res?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <img src={logo} alt="Logo" className="h-14 object-contain" />
          </div>

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

        {/* Register Card */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
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

            {/* Email */}
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

            {/* Password */}
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
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-gray-900 transition"
                />
              </div>
            </div>

            {/* Confirm Password */}
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

            {/* Agreement Checkbox */}
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
                <span className="font-medium text-gray-900 hover:underline cursor-pointer">
                  Terms & Conditions
                </span>{" "}
                and{" "}
                <span className="font-medium text-gray-900 hover:underline cursor-pointer">
                  Privacy Policy
                </span>
              </label>
            </div>

            {/* Button */}
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
              "
            >
              <UserPlus size={18} />
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 pt-4 border-t text-center">
            <p className="text-xs text-gray-400">
              Admin Dashboard Security System
            </p>
          </div>
        </div>

        {/* Status */}
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
  );
};

export default RegisterAdmin;

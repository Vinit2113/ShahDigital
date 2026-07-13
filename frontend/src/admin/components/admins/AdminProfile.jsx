import React, { useState } from "react";
import { User, Mail, Phone, Shield, Lock, Save } from "lucide-react";

const AdminProfile = () => {
  const [form, setForm] = useState({
    name: "Admin User",
    email: "admin@example.com",
    phone: "+91 98765 43210",
  });

  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordChange = (e) => {
    setPassword({
      ...password,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="p-6 md:p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Admin Profile</h1>

        <p className="text-sm text-gray-500 mt-1">
          Manage your account information and security settings
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex flex-col items-center text-center">
            <div className="h-24 w-24 rounded-full bg-gray-900 text-white flex items-center justify-center text-3xl font-semibold">
              {form.name.charAt(0)}
            </div>

            <h2 className="mt-4 text-lg font-semibold text-gray-900">
              {form.name}
            </h2>

            <p className="text-sm text-gray-500">Super Administrator</p>

            <div className="mt-5 w-full border-t pt-5 space-y-3 text-sm">
              <div className="flex items-center gap-3 text-gray-600">
                <Shield size={17} />
                Admin Access
              </div>

              <div className="flex items-center gap-3 text-gray-600">
                <Mail size={17} />
                {form.email}
              </div>
            </div>
          </div>
        </div>

        {/* Update Profile */}
        <div className="xl:col-span-2 space-y-6">
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <User size={20} />
              <h2 className="font-semibold text-gray-900">
                Personal Information
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="text-sm text-gray-600">Full Name</label>

                <div className="relative mt-2">
                  <User
                    size={17}
                    className="absolute left-3 top-3 text-gray-400"
                  />

                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="
                    w-full pl-10 px-4 py-2.5
                    border border-gray-200 rounded-lg
                    focus:outline-none focus:ring-2 focus:ring-gray-900/10
                    "
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-600">Email Address</label>

                <div className="relative mt-2">
                  <Mail
                    size={17}
                    className="absolute left-3 top-3 text-gray-400"
                  />

                  <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="
                    w-full pl-10 px-4 py-2.5
                    border border-gray-200 rounded-lg
                    "
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-600">Phone Number</label>

                <div className="relative mt-2">
                  <Phone
                    size={17}
                    className="absolute left-3 top-3 text-gray-400"
                  />

                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="
                    w-full pl-10 px-4 py-2.5
                    border border-gray-200 rounded-lg
                    "
                  />
                </div>
              </div>
            </div>

            <button
              className="
              mt-6
              flex items-center gap-2
              bg-gray-900 text-white
              px-5 py-2.5
              rounded-lg
              hover:bg-black
              transition
              "
            >
              <Save size={18} />
              Save Changes
            </button>
          </div>

          {/* Password */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <Lock size={20} />

              <h2 className="font-semibold text-gray-900">Change Password</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <input
                type="password"
                name="oldPassword"
                placeholder="Current Password"
                onChange={handlePasswordChange}
                className="
                px-4 py-2.5
                border border-gray-200
                rounded-lg
                "
              />

              <input
                type="password"
                name="newPassword"
                placeholder="New Password"
                onChange={handlePasswordChange}
                className="
                px-4 py-2.5
                border border-gray-200
                rounded-lg
                "
              />

              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                onChange={handlePasswordChange}
                className="
                px-4 py-2.5
                border border-gray-200
                rounded-lg
                "
              />
            </div>

            <button
              className="
              mt-5
              px-5 py-2.5
              rounded-lg
              border border-gray-900
              text-gray-900
              hover:bg-gray-900
              hover:text-white
              transition
              "
            >
              Update Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;

import { useState } from "react";
import { NavLink, useNavigate } from "react-router";

const baseURL = import.meta.env.VITE_BACKEND_URL;

const LoginPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);

      // FIX: was pointing at a URL ("localhost:5000/api/customers/login")
      // that doesn't match this backend at all - the real endpoint is
      // ${VITE_BACKEND_URL}auth/login (see backend/routes/auth.routes.js).
      // credentials: "include" so the browser stores the access_token
      // cookie the backend now sets on login (see authLogin.controller.js) -
      // without it, a cross-origin fetch neither sends nor receives cookies.
      const res = await fetch(`${baseURL}auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      // FIX: this was never actually storing anything, so Navbar.jsx's
      // `localStorage.getItem("user")` check never found a session and the
      // UI never reflected a successful login.
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);

      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fcfcfc] px-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-xl p-8 border">
        <h2 className="text-2xl font-semibold text-blue-900 text-center mb-6">
          Welcome Back
        </h2>

        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-50 p-2 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0a54ff]"
            required
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0a54ff]"
            required
          />

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0a54ff] text-white py-2 rounded-lg font-medium hover:bg-blue-800 transition-all duration-200"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Register link */}
        <p className="text-sm text-center mt-4 text-gray-600">
          Don’t have an account?{" "}
          <NavLink to="/register" className="text-[#0a54ff] font-medium">
            Register
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

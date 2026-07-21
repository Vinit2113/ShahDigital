import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import toast from "react-hot-toast";

const baseURL = import.meta.env.VITE_BACKEND_URL;

const adminLoginHook = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    const email = formData.email.trim();
    const password = formData.password.trim();

    if (!email || !password) {
      return toast.error("Email and password are required");
    }

    try {
      setLoading(true);

      const response = await axios.post(
        `${baseURL}admin/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        },
      );
      const { message, user } = response.data;

      // Check role - admin and owner both get dashboard access
      if (user?.role !== "admin" && user?.role !== "owner") {
        toast.error("You are not authorized as admin");
        return;
      }

      toast.success(message || "Login successful");

      // Store user only (JWT is already stored in HTTP-only cookie)
      localStorage.setItem("admin", JSON.stringify(user));

      navigate("/admin");
    } catch (error) {

      toast.error(error.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    loading,
    showPassword,
    setShowPassword,
  };
};

export default adminLoginHook;

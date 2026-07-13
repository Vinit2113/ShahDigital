import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const baseURL = import.meta.env.VITE_BACKEND_URL;

const adminRegisterHook = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

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

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    if (!formData.name || !formData.email || !formData.password) {
      return toast.error("All fields are required");
    }

    // if (formData.password !== formData.confirmPassword) {
    //   return toast.error("Passwords do not match");
    // }

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

    //   console.log(res.data.admin);
      toast.success(res.data.message || "Admin created successfully");

      localStorage.setItem("admin", JSON.stringify(res.data.admin));

      navigate("/admin");
    } catch (error) {
      console.log("Register Error", error);

      toast.error(error.response?.data?.message || "Something went wrong");
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

export default adminRegisterHook;

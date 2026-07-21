import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const baseURL = import.meta.env.VITE_BACKEND_URL;
const adminLogoutHook = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const logout = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${baseURL}admin/logout`,
        {},
        { withCredentials: true },
      );
      // Clear local storage before logou
      toast.success("Logout successfully");
      localStorage.clear();
      navigate("/admin/login");
    } catch (error) {
      return toast.error(
        error.response?.data?.message || "Something went wrong ",
      );
    }
  };
  // return logout
  return { logout, loading };
};

export default adminLogoutHook;

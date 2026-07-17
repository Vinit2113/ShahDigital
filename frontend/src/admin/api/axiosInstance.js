import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

// RESPONSE INTERCEPTOR
api.interceptors.response.use(
  (response) => {
    // Successful response
    return response;
  },

  (error) => {
    console.log("API ERROR:", error);

    const response = error?.response;
    const data = response?.data;

    console.log("ERROR STATUS:", response?.status);
    console.log("ERROR DATA:", data);

    const status = response?.status || data?.status;

    // Handle different backend response formats
    const code = data?.code || data?.error || data?.message;

    if (
      status === 401 &&
      (code === "TOKEN_EXPIRED" ||
        code === "TOKEN_INVALID" ||
        code === "NO_TOKEN" ||
        code?.toLowerCase()?.includes("token"))
    ) {
      console.log("JWT FAILED - LOGGING OUT");

      // Remove saved user data
      localStorage.clear();
      sessionStorage.clear();

      // Remove cookie (only works if cookie is not HttpOnly)
      document.cookie =
        "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

      // Redirect to login
      window.location.replace("/admin/login");
    }

    return Promise.reject(error);
  },
);

export default api;

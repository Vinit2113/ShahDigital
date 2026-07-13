import { useEffect, useState } from "react";

const adminNavbarHook = () => {
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const storedAdmin = localStorage.getItem("admin");

    if (storedAdmin) {
      setAdmin(JSON.parse(storedAdmin));
    }
  }, []);
  return admin;
};

export default adminNavbarHook;

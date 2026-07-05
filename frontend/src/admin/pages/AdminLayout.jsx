import React from "react";
import { Outlet } from "react-router";
import AdminNavbar from "../layouts/AdminNavbar";
import AdminSidebar from "../layouts/AdminSidebar";

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />
      <AdminSidebar />

      <main className="ml-64 mt-16 min-h-[calc(100vh-64px)] p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;

import { Navigate, Outlet } from "react-router";
import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";

// Client-side guard for the admin shell. Real authorization is already
// enforced server-side via verifyToken/onlyAdmins on every admin API call -
// this just stops the admin shell itself from rendering to a logged-out
// visitor before their first API call fails.
const ProtectedAdminRoute = () => {
  const admin = localStorage.getItem("admin");

  if (!admin) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    // "admin-shell" scales down the whole admin dashboard (see index.css) -
    // the user-facing site is untouched. Tailwind's text-* utilities are
    // rem-based, which only respond to the root <html> font-size no matter
    // how deeply nested, so scoping a font-size change to just this div
    // wouldn't shrink anything inside it - zoom does, since it scales the
    // actual rendered box (text, padding, icons, borders) as one unit.
    <div className="admin-shell min-h-screen bg-gray-50">
      <AdminNavbar />
      <AdminSidebar />

      <main className="ml-64 mt-16 min-h-[calc(100vh-64px)] p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default ProtectedAdminRoute;

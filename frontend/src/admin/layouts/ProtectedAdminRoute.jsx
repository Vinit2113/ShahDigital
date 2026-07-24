import { useState } from "react";
import { Navigate, Outlet } from "react-router";
import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";

// Client-side guard for the admin shell. Real authorization is already
// enforced server-side via verifyToken/onlyAdmins on every admin API call -
// this just stops the admin shell itself from rendering to a logged-out
// visitor before their first API call fails.
const ProtectedAdminRoute = () => {
  const admin = localStorage.getItem("admin");
  // FIX: sidebar open/close state lifted here (was local to AdminSidebar,
  // with no way for AdminNavbar to open it) so AdminNavbar's hamburger
  // button can actually toggle the same sidebar instance.
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
      <AdminNavbar onMenuClick={() => setSidebarOpen(true)} />
      <AdminSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* FIX: this was "ml-64" unconditionally, pushing all content 256px
          right even on mobile where the sidebar is hidden off-canvas -
          most of the admin dashboard was squeezed into a sliver on small
          screens. Sidebar only takes up permanent layout space at md+. */}
      <main className="ml-0 md:ml-64 mt-16 min-h-[calc(100vh-64px)] p-4 sm:p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default ProtectedAdminRoute;

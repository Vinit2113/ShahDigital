import { BrowserRouter, Route, Routes, Outlet } from "react-router";
import HomePage from "./user/pages/HomePage";
import UnderConstruction from "./user/pages/UnderConstruction";
import CataloguePage from "./user/pages/CataloguePage";
import Navbar from "./user/layouts/Navbar";
import Footer from "./user/layouts/Footer";
import RegisterPage from "./user/pages/RegisterPage";
import LoginPage from "./user/pages/LoginPage";
import RegisterAdmin from "./admin/pages/RegisterAdmin";
import { Toaster } from "react-hot-toast";

import AdminDashboard from "./admin/pages/AdminDashboard";
import AdminNavbar from "./admin/layouts/AdminNavbar";
import AdminSidebar from "./admin/layouts/AdminSidebar";
import LoginAdmin from "./admin/pages/LoginAdmin";
import AdminProfile from "./admin/components/admins/AdminProfile";
import AddCategory from "./admin/components/CategoryAdmin/AddCategory";
import ListCategory from "./admin/components/CategoryAdmin/ListCategory";

// Layout wrapper
const UserLayout = () => (
  <div className="font-mono">
    <Navbar />
    <Outlet />
    <Footer />
  </div>
);

// STATUS LOGGIN

const AdminLayout = () => (
  <div className="min-h-screen bg-gray-50">
    <AdminNavbar />
    <AdminSidebar />

    <main className="ml-64 mt-16 min-h-[calc(100vh-64px)] p-6">
      <Outlet />
    </main>
  </div>
);

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* USER ROUTES */}
        <Route element={<UserLayout />}>
          <Route path="/" element={<HomePage />} />

          {/* USER AUTH */}
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />

          <Route path="/about-us" element={<UnderConstruction />} />
          <Route path="/products" element={<UnderConstruction />} />
          <Route path="/service" element={<UnderConstruction />} />
          <Route path="/catalogue" element={<CataloguePage />} />
          <Route path="/contact-us" element={<UnderConstruction />} />
        </Route>

        {/* ADMIN ROUTES */}
        {/* UNIVERSAL FALLBACK CODE ! */}
        <Route path="/admin/register" element={<RegisterAdmin />} />
        <Route path="/admin/login" element={<LoginAdmin />} />

        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/profile" element={<AdminProfile />} />

          {/* CATEGORY ROUTES */}
          <Route path="/admin/categories/new" element={<AddCategory />} />
          <Route path="/admin/categories/list" element={<ListCategory />} />
        </Route>
      </Routes>
      <Toaster position="top-center" reverseOrder={false} />
    </BrowserRouter>
  );
};

export default App;

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
import AddAttribute from "./admin/components/AttributeAdmin/AddAttribute";
import ListAttribute from "./admin/components/AttributeAdmin/ListAttribute";
import ViewAttribute from "./admin/components/AttributeAdmin/ViewAttribute";
import WhatsAppButton from "./user/layouts/WhatsAppButton";
import CategoryAttributeMapping from "./admin/pages/CategoryAttributeMapping";
// NEW: read-only "which attributes are mapped to which category" list page,
// separate from the CategoryAttributeMapping editor above.
import CategoryAttributeList from "./admin/pages/CategoryAttributeList";
import AddBrand from "./admin/components/BrandsAdmin/AddBrand";
import ListBrand from "./admin/components/BrandsAdmin/ListBrand";
import ListEnquiries from "./admin/components/EnquiriesAdmin/ListEnquiries";

// Layout wrapper
const UserLayout = () => (
  <div className="font-mono">
    <Navbar />
    <Outlet />
    <WhatsAppButton />
    <Footer />
  </div>
);

// STATUS LOGGIN

// FIX: "admin-shell" class scales down the whole admin dashboard (see
// index.css) - the user-facing site is untouched. Tailwind's text-*
// utilities are rem-based, which only respond to the root <html> font-size
// no matter how deeply nested, so scoping a font-size change to just this
// div wouldn't shrink anything inside it - zoom does, since it scales the
// actual rendered box (text, padding, icons, borders) as one unit.
const AdminLayout = () => (
  <div className="admin-shell min-h-screen bg-gray-50">
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

          {/* ATTRIBUTE ROUTES */}
          <Route path="/admin/attributes/add" element={<AddAttribute />} />
          <Route path="/admin/attributes/list" element={<ListAttribute />} />
          <Route path="/admin/attributes/view" element={<ViewAttribute />} />
          <Route
            path="/admin/attributes/assign"
            element={<CategoryAttributeMapping />}
          />
          {/* NEW: read-only category -> attributes overview page */}
          <Route
            path="/admin/attributes/mappings"
            element={<CategoryAttributeList />}
          />

          {/* BRAND ROUTES */}
          {/* NEW: sidebar already linked here (AdminSidebar.jsx "Add
              Brand" / "All Brands") but no pages existed for either
              until now. */}
          <Route path="/admin/brands/new" element={<AddBrand />} />
          <Route path="/admin/brands" element={<ListBrand />} />

          {/* ENQUIRY ROUTES */}
          <Route path="/admin/enquiries" element={<ListEnquiries />} />
        </Route>
      </Routes>
      <Toaster position="top-center" reverseOrder={false} />
    </BrowserRouter>
  );
};

export default App;

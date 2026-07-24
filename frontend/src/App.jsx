import { BrowserRouter, Route, Routes, Outlet, Navigate } from "react-router";
import HomePage from "./user/pages/HomePage";
import AboutUsPage from "./user/pages/AboutUsPage";
import UnderConstruction from "./user/pages/UnderConstruction";
import NotFound from "./user/pages/NotFound";
import PrivacyPolicy from "./user/pages/PrivacyPolicy";
import TermsAndConditions from "./user/pages/TermsAndConditions";
import ContactUsPage from "./user/pages/ContactUsPage";
// import SupportPage from "./user/pages/SupportPage";
import Navbar from "./user/layouts/Navbar";
import Footer from "./user/layouts/Footer";
import RegisterAdmin from "./admin/pages/RegisterAdmin";
import { Toaster } from "react-hot-toast";

import AdminDashboard from "./admin/pages/AdminDashboard";
import ProtectedAdminRoute from "./admin/layouts/ProtectedAdminRoute";
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
import AddProduct from "./admin/components/ProductsAdmin/AddProduct";
import ListProduct from "./admin/components/ProductsAdmin/ListProduct";
import ListCatalogue from "./admin/components/CatalogueAdmin/ListCatalogue";
import AddCatalogueProduct from "./admin/components/CatalogueAdmin/AddCatalogueProduct";
import CataloguePage from "./user/pages/CataloguePage";

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

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* USER ROUTES */}
        <Route element={<UserLayout />}>
          <Route path="/" element={<HomePage />} />

          {/* USER AUTH - disabled for now (site still under construction);
              Navbar's "Enquire Now" is the interim path instead */}
          <Route path="/register" element={<Navigate to="/" replace />} />
          <Route path="/login" element={<Navigate to="/" replace />} />

          <Route path="/about-us" element={<AboutUsPage />} />
          <Route path="/products" element={<UnderConstruction />} />
          <Route path="/service" element={<UnderConstruction />} />
          <Route path="/catalogue" element={<UnderConstruction />} />
          <Route path="/catalogue/admin" element={<CataloguePage />} />
          <Route path="/contact-us" element={<ContactUsPage />} />

          {/* LEGAL / FOOTER LINKS */}
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsAndConditions />} />
          {/* <Route path="/support" element={<SupportPage />} /> */}
          <Route path="/support" element={<UnderConstruction />} />

          {/* CATCH-ALL - must stay last within this layout group */}
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* ADMIN ROUTES */}
        {/* UNIVERSAL FALLBACK CODE ! */}
        <Route path="/admin/login" element={<LoginAdmin />} />
        <Route element={<ProtectedAdminRoute />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/profile" element={<AdminProfile />} />
          <Route path="/admin/register" element={<RegisterAdmin />} />

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

          {/* PRODUCT ROUTES */}
          {/* NEW: sidebar already linked here (AdminSidebar.jsx "All
              Products" / "Add Product") but no pages existed for either
              until now. */}
          <Route path="/admin/products/new" element={<AddProduct />} />
          <Route path="/admin/products" element={<ListProduct />} />

          {/* CATALOGUE ROUTES - separate from Products: its own CRUD for
              catalogue-facing fields only (name, description, category,
              brand, features, images) - no pricing/stock, same
              shahDigital.products table Products uses. */}
          <Route
            path="/admin/catalogue/new"
            element={<AddCatalogueProduct />}
          />
          <Route path="/admin/catalogue" element={<ListCatalogue />} />

          {/* ENQUIRY ROUTES */}
          <Route path="/admin/enquiries" element={<ListEnquiries />} />
        </Route>
      </Routes>
      <Toaster position="top-center" reverseOrder={false} />
    </BrowserRouter>
  );
};

export default App;

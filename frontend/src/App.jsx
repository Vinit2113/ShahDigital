import { BrowserRouter, Route, Routes, Outlet } from "react-router";
import HomePage from "./user/pages/HomePage";
import UnderConstruction from "./user/pages/UnderConstruction";
import CataloguePage from "./user/pages/CataloguePage";
import Navbar from "./user/layouts/Navbar";
import Footer from "./user/layouts/Footer";
import AdminLayout from "./admin/pages/AdminLayout";
import RegisterPage from "./user/pages/RegisterPage";
import LoginPage from "./user/pages/LoginPage";

// Layout wrapper
const UserLayout = () => (
  <div className="font-mono">
    <Navbar />
    <Outlet />
    <Footer />
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
        </Route>

        {/* ADMIN ROUTES */}
        <Route path="/admin" element={<AdminLayout />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

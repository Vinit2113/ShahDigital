  import { useEffect, useState } from "react";
  import { NavLink, useNavigate, useLocation } from "react-router";
  import sd_image from "../../assets/Logo_shahdigital_no_bg.png";
  import gsap from "gsap";
  import { useGSAP } from "@gsap/react";
  import ContactModal from "../components/CataloguePage/ContactModel";

  // Register the hook as a plugin
  gsap.registerPlugin(useGSAP);

  const navLinkClass = ({ isActive }) =>
    `navlink relative transition-colors duration-200 ease-in-out
    ${
      isActive
        ? "text-[#0a54ff] after:w-full"
        : "text-blue-900 hover:text-[#0a54ff] after:w-0 hover:after:w-full"
    }
    after:content-['']
    after:absolute
    after:left-0
    after:-bottom-1
    after:h-0.5
    after:bg-[#0a54ff]
    after:transition-all
    after:duration-500`;

  const Navbar = () => {
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState(null);
    // Login/registration are disabled for now (site still under
    // construction) - "Enquire Now" opens the same enquiry form used on
    // product pages, in its general (no specific product) mode.
    const [enquiryOpen, setEnquiryOpen] = useState(false);
    // Shrinks the navbar once the page scrolls past a small threshold, so
    // it reclaims screen space while browsing instead of staying full-height.
    const [scrolled, setScrolled] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
      const handleScroll = () => setScrolled(window.scrollY > 20);
      handleScroll();
      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // FIX: this only ran once on mount (empty dep array), so logging in via
    // LoginPage and then navigating here client-side (no full page reload)
    // never re-read localStorage - the navbar looked logged-out even right
    // after a successful login. Re-checking on every route change catches
    // the post-login navigate("/").
    useEffect(() => {
      const storedUser = localStorage.getItem("user");
      setUser(storedUser ? JSON.parse(storedUser) : null);
    }, [location.pathname]);

    const handleLogout = () => {
      localStorage.removeItem("user");
      localStorage.removeItem("token"); // Optional if you're storing JWT

      setUser(null);
      navigate("/");
    };

    useGSAP(() => {
  let tl = gsap.timeline();
  tl.from(".navlink", {
    y: -60,
    opacity: 0,
    duration: 1,
    stagger: 0.3,
  });
      
      
}); 
    

    return (
      <div
        className={`sticky top-0 z-50 bg-[#fcfcfc]/70 backdrop-blur-md border border-transparent transition-all duration-500 ease-in-out ${
          scrolled ? "shadow-md" : "shadow-sm"
        }`}
      >
        {/* TOP BAR */}
        <div
          className={`flex justify-between items-center px-3 transition-all duration-500 ease-in-out ${
            scrolled ? "py-0" : "py-1"
          }`}
        >
          {/* LEFT LOGO */}
          <div>
            <img
              src={sd_image}
              className={`navlink object-contain m-2 transition-all duration-500 ease-in-out ${
                scrolled
                  ? "w-28 sm:w-36 h-10 sm:h-14"
                  : "w-40 sm:w-50 h-16 sm:h-20"
              }`}
              alt="Logo"
            />
          </div>

          {/* MOBILE HAMBURGER */}
          <div className="flex md:hidden items-center gap-1 mr-2">
          <button
            className="text-blue-900"
            onClick={() => setOpen(!open)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          </div>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-10 lg:gap-10">
            <NavLink to="/" end className={  navLinkClass}>
              Home

            </NavLink>

            <NavLink to="/about-us" className={navLinkClass }>
              About Us
            </NavLink>

            <NavLink to="/catalogue" className={navLinkClass}>
              Catalogue
            </NavLink>

            <NavLink to="/products" className={navLinkClass}>
              Products
            </NavLink>

            <NavLink to="/service" className={navLinkClass}>
              Services
            </NavLink>

            <NavLink to="/contact-us" className={navLinkClass}>
              Contact Us
            </NavLink>
          </div>

          {/* RIGHT SIDE */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <span className="text-blue-900 font-medium">
                  Hello, {user.name}
                </span>

                <button
                  onClick={handleLogout}
                  className=" px-5 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-all duration-200 shadow-sm"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => setEnquiryOpen(true)}
                className=" px-5 py-2 text-sm font-medium text-white bg-[#0a54ff] rounded-lg hover:bg-blue-800 transition-all duration-200 shadow-sm"
              >
                Enquire Now
              </button>
            )}
          </div>
        </div>

        {/* MOBILE MENU */}
        {open && (
          <div className="md:hidden flex flex-col gap-4 px-5 pb-4">
            <NavLink to="/" end className={navLinkClass}>
              Home
            </NavLink>

            <NavLink to="/about-us" className={navLinkClass}>
              About Us
            </NavLink>

            <NavLink to="/catalogue" className={navLinkClass}>
              Catalogue
            </NavLink>

            <NavLink to="/products" className={navLinkClass}>
              Products
            </NavLink>

            <NavLink to="/service" className={navLinkClass}>
              Services
            </NavLink>

            <NavLink to="/contact-us" className={navLinkClass}>
              Contact Us
            </NavLink>

            <div className="mt-2">
              {user ? (
                <>
                  <div className="mb-3 text-blue-900 font-medium">
                    Hello, {user.name}
                  </div>

                  <button
                    onClick={handleLogout}
                    className="block w-full text-center px-5 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-all duration-200 shadow-sm"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setOpen(false);
                    setEnquiryOpen(true);
                  }}
                  className="block w-full text-center px-5 py-2 text-sm font-medium text-white bg-[#0a54ff] rounded-lg hover:bg-blue-800 transition-all duration-200 shadow-sm"
                >
                  Enquire Now
                </button>
              )}
            </div>
          </div>
        )}

        <ContactModal
          selectedProduct={enquiryOpen ? {} : null}
          setSelectedProduct={(val) => setEnquiryOpen(Boolean(val))}
        />
      </div>
    );
  };

  export default Navbar;

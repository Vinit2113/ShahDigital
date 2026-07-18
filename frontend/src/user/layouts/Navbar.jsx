  import { useEffect, useState } from "react";
  import { NavLink, useNavigate } from "react-router";
  import sd_image from "../../assets/Logo_shahdigital_no_bg.png";
  import gsap from "gsap";
  import { useGSAP } from "@gsap/react";

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

    const navigate = useNavigate();

    useEffect(() => {
      const storedUser = localStorage.getItem("user");

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }, []);

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
      <div className="bg-[#fcfcfc] shadow-sm border border-transparent">
        {/* TOP BAR */}
        <div className=" flex justify-between items-center px-3">
          {/* LEFT LOGO */}
          <div>
            <img
              src={sd_image}
              className=" navlink w-40 sm:w-50 h-16 sm:h-20 object-contain m-2"
              alt="Logo"
            />
          </div>

          {/* HAMBURGER */}
          <button
            className="md:hidden text-blue-900 mr-2"
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

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-10 lg:gap-20">
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
              <>
                <NavLink
                  to="/login"
                  className=" px-5 py-2 text-sm font-medium text-[#0a54ff] border border-[#0a54ff] rounded-lg hover:bg-[#0a54ff] hover:text-white transition-all duration-200"
                >
                  Login
                </NavLink>

                <NavLink
                  to="/register"
                  className=" px-5 py-2 text-sm font-medium text-white bg-[#0a54ff] rounded-lg hover:bg-blue-800 transition-all duration-200 shadow-sm"
                >
                  Registration
                </NavLink>
              </>
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
                <div className="flex flex-col gap-3">
                  <NavLink
                    to="/login"
                    className="block w-full text-center px-5 py-2 text-sm font-medium text-[#0a54ff] border border-[#0a54ff] rounded-lg hover:bg-[#0a54ff] hover:text-white transition-all duration-200"
                  >
                    Login
                  </NavLink>

                  <NavLink
                    to="/register"
                    className="block w-full text-center px-5 py-2 text-sm font-medium text-white bg-[#0a54ff] rounded-lg hover:bg-blue-800 transition-all duration-200 shadow-sm"
                  >
                    Registration
                  </NavLink>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  export default Navbar;

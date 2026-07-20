import { FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-blue-950 text-white pt-12 sm:pt-14 md:pt-16 pb-6 sm:pb-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Top Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          {/* Brand */}
          <div className="text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 mb-4">
              <div className="w-10 h-10 bg-white text-blue-950 rounded-xl flex items-center justify-center font-bold">
                IT
              </div>
              <span className="text-xl font-bold">ShahDigital.in</span>
            </div>

            <p className="text-blue-100 text-sm leading-relaxed">
              Your trusted partner for IT hardware supply, enterprise solutions,
              and global IT brands. We deliver quality, reliability, and speed.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center sm:text-left">
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-blue-200">
              <li>
                <Link to="/" className="hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-white">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/catalogue" className="hover:text-white">
                  Brands
                </Link>
              </li>
              <li>
                <Link to="/about-us" className="hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact-us" className="hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="text-center sm:text-left">
            <h3 className="font-semibold mb-4">Our Solutions</h3>
            <ul className="space-y-2 text-sm text-blue-200">
              <li>Storage Devices</li>
              <li>Networking Equipment</li>
              <li>Printers & Peripherals</li>
              <li>Enterprise IT Setup</li>
              <li>Bulk Hardware Supply</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="text-center sm:text-left">
            <h3 className="font-semibold mb-4">Contact Us</h3>

            <div className="space-y-3 text-sm text-blue-200">
              {/* TODO: replace with real business phone/email before launch */}
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <FaPhone />
                <span className="wrap-break-words">+91 98765 43210</span>
              </div>

              <div className="flex items-center justify-center sm:justify-start gap-2">
                <FaEnvelope />
                <span className="wrap-break-words">sales@corprixit.com</span>
              </div>

              <div className="flex items-start justify-center sm:justify-start gap-2">
                <FaMapMarkerAlt className="mt-1" />
                <span className="wrap-break-word">
                  Ahmedabad, Gujarat, India
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-blue-800 mt-8 sm:mt-10 pt-6 flex flex-col md:flex-row items-center justify-between text-sm text-blue-300 gap-3 md:gap-0">
          <p className="text-center md:text-left">
            © {new Date().getFullYear()} ShahDigital. All rights reserved.
          </p>

          <div className="flex flex-wrap justify-center md:justify-end gap-4">
            <Link to="/privacy-policy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-white">
              Terms
            </Link>
            <Link to="/support" className="hover:text-white">
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

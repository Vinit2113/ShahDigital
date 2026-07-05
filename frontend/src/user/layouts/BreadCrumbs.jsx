import { Link, useLocation } from "react-router";

const BreadCrumbs = () => {
  const location = useLocation();

  const pathnames = location.pathname.split("/").filter(Boolean);

  return (
    <nav className="text-sm text-gray-500 mb-4">
      <Link to="/" className="hover:text-blue-600 transition">
        Home
      </Link>

      {pathnames.map((name, index) => {
        const routeTo = "/" + pathnames.slice(0, index + 1).join("/");

        const isLast = index === pathnames.length - 1;

        return (
          <span key={routeTo}>
            <span className="mx-2 text-gray-300">›</span>

            {isLast ? (
              <span className="text-gray-900 font-medium capitalize">
                {decodeURIComponent(name).replace(/-/g, " ")}
              </span>
            ) : (
              <Link
                to={routeTo}
                className="hover:text-blue-600 transition capitalize"
              >
                {decodeURIComponent(name).replace(/-/g, " ")}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
};

export default BreadCrumbs;

import { Link } from "react-router";

const NotFound = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-20 bg-linear-to-br from-blue-50 via-white to-blue-100 overflow-hidden relative">
      <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-blue-200/40 blur-3xl" />
      <div className="absolute -bottom-24 -right-16 w-80 h-80 rounded-full bg-blue-300/30 blur-3xl" />

      <div className="relative max-w-lg w-full bg-white border border-blue-100 rounded-3xl p-8 sm:p-10 text-center shadow-2xl">
        <div className="text-6xl sm:text-7xl mb-6">🧭</div>

        <span className="inline-block px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold tracking-wide uppercase mb-4">
          404
        </span>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-blue-950 leading-snug">
          This page doesn't exist
        </h1>

        <p className="text-gray-600 mt-4 text-base sm:text-lg">
          The link might be broken, or the page may have moved. Let's get you
          back on track.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="px-6 py-3 bg-[#0a54ff] text-white rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            Take me home
          </Link>

          <Link
            to="/catalogue"
            className="px-6 py-3 border border-blue-200 text-blue-900 rounded-xl font-semibold hover:bg-blue-50 transition"
          >
            Browse catalogue
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFound;

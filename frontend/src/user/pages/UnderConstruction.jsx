import { Link } from "react-router";

const UnderConstruction = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 via-white to-blue-100 px-6">
      <div className="text-center max-w-xl">
        {/* Icon / Badge */}
        <div className="text-6xl mb-6">🚧</div>

        <h1 className="text-4xl font-bold text-blue-950">
          Page Under Development
        </h1>

        <p className="text-gray-600 mt-4 text-lg">
          This section is currently being built. We’re working hard to bring it
          to you soon with full features and updates.
        </p>

        <div className="mt-8 flex gap-4 justify-center">
          <Link
            to="/"
            className="px-6 py-3 bg-[#0a54ff] text-white rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            Go Home
          </Link>

          <Link
            to="/products"
            className="px-6 py-3 border border-blue-200 text-blue-900 rounded-xl font-semibold hover:bg-blue-50 transition"
          >
            Browse Products
          </Link>
        </div>

        {/* Optional subtle note */}
        <p className="text-sm text-gray-400 mt-10">
          🚀 We’re launching new features soon
        </p>
      </div>
    </section>
  );
};

export default UnderConstruction;

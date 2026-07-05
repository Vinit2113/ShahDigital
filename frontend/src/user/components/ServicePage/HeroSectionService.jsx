import { Link } from "react-router";

const HeroSectionService = () => {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-slate-950 via-blue-950 to-slate-900">
      {/* subtle grid background */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-8 py-28">
        <div className="grid lg:grid-cols-2 items-center gap-20">
          {/* LEFT */}
          <div>
            <span className="inline-block px-5 py-2 rounded-full bg-white/10 text-blue-100 text-sm tracking-wide">
              Managed IT Infrastructure Services
            </span>

            <h1 className="mt-6 text-5xl lg:text-6xl font-bold text-white leading-tight">
              We Build &
              <span className="block text-blue-400">Manage IT Systems</span>
              That Power Your Business
            </h1>

            <p className="mt-6 text-lg text-blue-100/70 max-w-xl leading-relaxed">
              From office networks and server setup to enterprise hardware
              deployment and ongoing IT support — we become your dedicated
              technology partner so you can focus on growing your business.
            </p>

            {/* CTA */}
            <div className="flex gap-4 mt-10">
              <Link
                to={"/"}
                className="px-8 py-4 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition"
              >
                Request Consultation
              </Link>

              <Link
                to={"/"}
                className="px-8 py-4 border border-white/20 text-white rounded-xl hover:bg-white/10 transition"
              >
                View Services
              </Link>
            </div>

            {/* trust line (not stats, not cards) */}
            <p className="mt-10 text-sm text-blue-200/60">
              Trusted by businesses for reliable IT infrastructure, fast
              deployment, and secure systems.
            </p>
          </div>

          {/* RIGHT - SIMPLE POWER VISUAL */}
          <div className="relative flex justify-center">
            {/* central visual card */}
            <div className="w-110 h-130 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl p-8 shadow-2xl">
              {/* icon / visual */}
              <div className="h-52 rounded-2xl bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xl font-semibold">
                IT Infrastructure
              </div>

              {/* simple service statement */}
              <div className="mt-8 text-white">
                <h3 className="text-xl font-semibold">
                  Complete IT Management
                </h3>

                <p className="text-blue-100/60 mt-2 text-sm leading-relaxed">
                  We handle your entire IT ecosystem including networking,
                  servers, security, and hardware lifecycle management.
                </p>
              </div>

              {/* 3 core bullets only */}
              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3 text-blue-100">
                  <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                  Network & Infrastructure Setup
                </div>

                <div className="flex items-center gap-3 text-blue-100">
                  <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                  Server & Hardware Deployment
                </div>

                <div className="flex items-center gap-3 text-blue-100">
                  <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                  Managed IT Support Services
                </div>
              </div>

              {/* bottom highlight */}
              <div className="mt-10 p-4 rounded-xl bg-blue-500/10 border border-blue-400/20 text-blue-200 text-sm">
                End-to-end IT solutions for startups, SMEs & enterprises
              </div>
            </div>

            {/* floating simple badge */}
            <div className="absolute -right-6 top-10 bg-white text-blue-900 px-4 py-3 rounded-xl shadow-lg font-semibold text-sm">
              Enterprise Grade
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSectionService;

import { useEffect, useState } from "react";
import { Link } from "react-router";
import {
  Boxes,
  Layers,
  Tag,
  Mail,
  PlusCircle,
  ExternalLink,
  ArrowRight,
} from "lucide-react";
import categoriesServicces from "../services/categoriesServicces";
import attributeServices from "../services/attributeServices";
import brandsServices from "../services/brandsServices";
import enquiriesServices from "../services/enquiriesServices";

const sections = [
  {
    key: "categories",
    title: "Categories",
    desc: "Manage the product category tree.",
    icon: <Boxes size={22} />,
    to: "/admin/categories/list",
    addTo: "/admin/categories/new",
  },
  {
    key: "attributes",
    title: "Attributes",
    desc: "Manage attributes and their category mappings.",
    icon: <Layers size={22} />,
    to: "/admin/attributes/list",
    addTo: "/admin/attributes/add",
  },
  {
    key: "brands",
    title: "Brands",
    desc: "Manage the brands shown across the site.",
    icon: <Tag size={22} />,
    to: "/admin/brands",
    addTo: "/admin/brands/new",
  },
  {
    key: "enquiries",
    title: "Enquiries",
    desc: "Review submissions from the enquiry form.",
    icon: <Mail size={22} />,
    to: "/admin/enquiries",
  },
];

const STATUS_STYLES = {
  NEW: "bg-blue-100 text-blue-700",
  CONTACTED: "bg-yellow-100 text-yellow-700",
  CLOSED: "bg-green-100 text-green-700",
};

const AdminDashboard = () => {
  const [admin] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("admin"));
    } catch {
      return null;
    }
  });

  const [counts, setCounts] = useState({
    categories: null,
    attributes: null,
    brands: null,
    enquiries: null,
  });
  const [recentEnquiries, setRecentEnquiries] = useState([]);
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const loadStats = async () => {
      const [catRes, attrRes, brandRes, enquiryRes] = await Promise.allSettled(
        [
          categoriesServicces.fetchCatListAdmin(),
          attributeServices.listAttirbuteAdmin(),
          brandsServices.fetchBrandListAdmin(),
          enquiriesServices.fetchEnquiriesAdmin(),
        ],
      );

      if (cancelled) return;

      const enquiries =
        enquiryRes.status === "fulfilled"
          ? enquiryRes.value.data.enquiries || []
          : [];

      setCounts({
        categories:
          catRes.status === "fulfilled" ? catRes.value.data.count : null,
        attributes:
          attrRes.status === "fulfilled" ? attrRes.value.data.count : null,
        brands:
          brandRes.status === "fulfilled" ? brandRes.value.data.count : null,
        enquiries: enquiries.filter((e) => e.status === "NEW").length,
      });

      setRecentEnquiries(enquiries.slice(0, 5));
      setLoadingStats(false);
    };

    loadStats();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back{admin?.name ? `, ${admin.name}` : ""}
          </h1>
          <p className="text-gray-500 mt-1">
            Here's a quick jump-off point for what's live today.
          </p>
        </div>

        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition w-fit"
        >
          <ExternalLink size={16} />
          View site
        </a>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {sections.map((section) => (
          <div
            key={section.key}
            className="bg-white rounded-2xl border border-gray-200 p-5"
          >
            <p className="text-sm text-gray-500">{section.title}</p>
            <h2 className="text-3xl font-bold mt-2 text-gray-900">
              {loadingStats ? (
                <span className="inline-block h-8 w-10 rounded bg-gray-100 animate-pulse" />
              ) : (
                (counts[section.key] ?? "—")
              )}
            </h2>
            {section.key === "enquiries" && !loadingStats && (
              <p className="text-xs text-gray-400 mt-1">awaiting response</p>
            )}
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        {/* QUICK ACCESS */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {sections.map((section) => (
            <div
              key={section.key}
              className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition"
            >
              <div className="w-11 h-11 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                {section.icon}
              </div>

              <h2 className="font-semibold text-gray-900">
                {section.title}
              </h2>
              <p className="text-sm text-gray-500 mt-1">{section.desc}</p>

              <div className="mt-4 flex items-center gap-3">
                <Link
                  to={section.to}
                  className="text-sm font-medium text-blue-600 hover:underline"
                >
                  View all
                </Link>

                {section.addTo && (
                  <Link
                    to={section.addTo}
                    className="inline-flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-gray-900"
                  >
                    <PlusCircle size={14} />
                    Add
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* RECENT ENQUIRIES */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900">Recent Enquiries</h2>
            <Link
              to="/admin/enquiries"
              className="text-xs font-medium text-blue-600 hover:underline flex items-center gap-1"
            >
              View all
              <ArrowRight size={12} />
            </Link>
          </div>

          {loadingStats ? (
            <div className="space-y-3">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="h-12 rounded-lg bg-gray-50 animate-pulse"
                />
              ))}
            </div>
          ) : recentEnquiries.length === 0 ? (
            <p className="text-sm text-gray-400 py-6 text-center">
              No enquiries yet
            </p>
          ) : (
            <div className="space-y-3">
              {recentEnquiries.map((enquiry) => (
                <div
                  key={enquiry.enquiries_id}
                  className="flex items-start justify-between gap-3 border-b border-gray-100 pb-3 last:border-0 last:pb-0"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {enquiry.name}
                    </p>
                    <p className="text-xs text-gray-400 truncate">
                      {enquiry.product_display_name || "General enquiry"}
                    </p>
                  </div>

                  <span
                    className={`shrink-0 text-xs rounded-full px-2 py-0.5 ${STATUS_STYLES[enquiry.status] || "bg-gray-100 text-gray-600"}`}
                  >
                    {enquiry.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

import { useState } from "react";
import { Link } from "react-router";
import { Boxes, Layers, Tag, Mail, PlusCircle, ExternalLink } from "lucide-react";

const sections = [
  {
    title: "Categories",
    desc: "Manage the product category tree.",
    icon: <Boxes size={22} />,
    to: "/admin/categories/list",
    addTo: "/admin/categories/new",
  },
  {
    title: "Attributes",
    desc: "Manage attributes and their category mappings.",
    icon: <Layers size={22} />,
    to: "/admin/attributes/list",
    addTo: "/admin/attributes/add",
  },
  {
    title: "Brands",
    desc: "Manage the brands shown across the site.",
    icon: <Tag size={22} />,
    to: "/admin/brands",
    addTo: "/admin/brands/new",
  },
  {
    title: "Enquiries",
    desc: "Review submissions from the catalogue's enquiry form.",
    icon: <Mail size={22} />,
    to: "/admin/enquiries",
  },
];

const AdminDashboard = () => {
  const [admin] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("admin"));
    } catch {
      return null;
    }
  });

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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {sections.map((section) => (
          <div
            key={section.title}
            className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition"
          >
            <div className="w-11 h-11 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
              {section.icon}
            </div>

            <h2 className="font-semibold text-gray-900">{section.title}</h2>
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
    </div>
  );
};

export default AdminDashboard;

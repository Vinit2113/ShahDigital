import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import {
  LayoutDashboard,
  ShoppingBag,
  Boxes,
  Truck,
  CreditCard,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  Package,
  PlusCircle,
  Layers,
  Tag,
} from "lucide-react";

/* -----------------------------
   Menu Builder (CRUD-focused)
------------------------------*/
const buildMenu = (data) => [
  {
    title: "Dashboard",
    icon: <LayoutDashboard size={20} />,
    path: "/admin",
  },

  {
    title: "Products",
    icon: <ShoppingBag size={20} />,
    children: [
      {
        title: "All Products",
        path: "/admin/products",
        count: data?.products?.length,
        icon: <Package size={16} />,
      },
      {
        title: "Add Product",
        path: "/admin/products/new",
        icon: <PlusCircle size={16} />,
      },
      {
        title: "Inventory",
        path: "/admin/products/inventory",
        icon: <Layers size={16} />,
      },
    ],
  },

  {
    title: "Categories",
    icon: <Boxes size={20} />,
    children: [
      {
        title: "All Categories",
        path: "/admin/categories",
        count: data?.categories?.length,
      },
      {
        title: "Add Category",
        path: "/admin/categories/new",
      },
      {
        title: "Category Tree",
        path: "/admin/categories/tree",
      },
    ],
  },

  {
    title: "Brands",
    icon: <Tag size={20} />,
    children: [
      {
        title: "All Brands",
        path: "/admin/brands",
        count: data?.brands?.length,
      },
      {
        title: "Add Brand",
        path: "/admin/brands/new",
      },
    ],
  },

  {
    title: "Orders",
    icon: <Truck size={20} />,
    children: [
      {
        title: "All Orders",
        path: "/admin/orders",
        count: data?.orders?.length,
      },
      {
        title: "Pending Orders",
        path: "/admin/orders/pending",
      },
      {
        title: "Completed Orders",
        path: "/admin/orders/completed",
      },
    ],
  },

  {
    title: "Customers",
    icon: <Users size={20} />,
    children: [
      {
        title: "All Customers",
        path: "/admin/customers",
      },
      {
        title: "Addresses",
        path: "/admin/customers/addresses",
      },
    ],
  },

  {
    title: "Payments",
    icon: <CreditCard size={20} />,
    children: [
      {
        title: "Transactions",
        path: "/admin/payments",
      },
      {
        title: "Refunds",
        path: "/admin/payments/refunds",
      },
    ],
  },

  {
    title: "System",
    icon: <Settings size={20} />,
    children: [
      {
        title: "Media Library",
        path: "/admin/media",
      },
      {
        title: "Settings",
        path: "/admin/settings",
      },
    ],
  },
];

/* -----------------------------
      Sidebar Component
------------------------------*/
const AdminSidebar = ({ data }) => {
  const menuItems = buildMenu(data);

  const [openMenu, setOpenMenu] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = (title) => {
    setOpenMenu((prev) => (prev === title ? null : title));
  };

  const isActive = (path) => location.pathname === path;

  const handleNavigate = (path) => {
    if (path) {
      navigate(path);
      setIsOpen(false); // close sidebar on mobile
    }
  };

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-14 bg-white border-b flex items-center px-4 z-50">
        <button onClick={() => setIsOpen(true)}>
          <Menu />
        </button>
        <span className="ml-3 font-semibold">Admin Panel</span>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 md:top-16 left-0 z-50
          h-full md:h-[calc(100vh-64px)]
          w-72 md:w-64 bg-white border-r border-gray-200
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <div className="p-5 relative h-full flex flex-col">
          {/* Close button */}
          <div className="md:hidden flex justify-end mb-2">
            <button onClick={() => setIsOpen(false)}>
              <X />
            </button>
          </div>

          {/* MENU */}
          <nav className="space-y-2 flex-1 overflow-y-auto">
            {menuItems.map((item) => (
              <div key={item.title}>
                {/* MAIN ITEM */}
                <button
                  onClick={() =>
                    item.children
                      ? toggleMenu(item.title)
                      : handleNavigate(item.path)
                  }
                  className={`flex items-center justify-between w-full px-4 py-3 rounded-lg transition-all active:scale-[0.98]
                    ${
                      isActive(item.path)
                        ? "bg-gray-100 text-black"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <span>{item.title}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {item.count !== undefined && (
                      <span className="text-xs bg-gray-200 px-2 py-0.5 rounded-full">
                        {item.count}
                      </span>
                    )}

                    {item.children && (
                      <span className="text-xs">
                        {openMenu === item.title ? "▲" : "▼"}
                      </span>
                    )}
                  </div>
                </button>

                {/* CHILDREN */}
                <div
                  className={`ml-10 mt-1 space-y-1 overflow-hidden transition-all duration-300 ease-in-out ${
                    openMenu === item.title
                      ? "max-h-60 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  {item.children?.map((child) => (
                    <button
                      key={child.title}
                      onClick={() => handleNavigate(child.path)}
                      className={`w-full flex justify-between text-left text-sm px-2 py-1 rounded transition
                        ${
                          isActive(child.path)
                            ? "text-black bg-gray-100"
                            : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                        }`}
                    >
                      <span className="flex items-center gap-2">
                        {child.icon}
                        {child.title}
                      </span>

                      {child.count !== undefined && (
                        <span className="text-xs text-gray-400">
                          {child.count}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </nav>

          {/* LOGOUT */}
          <div className="mt-auto pt-4 border-t">
            <button className="flex items-center gap-3 w-full px-4 py-3 rounded-lg hover:bg-red-50 text-red-500 transition active:scale-[0.98]">
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;

import { useState } from "react";
import Pagination from "../pagination/Pagination";
import ProductCard from "./ProductCard";

const ProductGrid = () => {
  const products = [
    {
      id: 1,
      name: "TP-Link Dual Band Router",
      spec: "1 Gbps • Dual Band • WiFi 6",
      price: 2499,
      mrp: 3299,
      qty: 1,
      stock: "In Stock",
      image: "https://picsum.photos/300/200?random=1",
    },
    {
      id: 2,
      name: "Seagate External HDD",
      spec: "1TB • USB 3.0 • Portable",
      price: 4199,
      mrp: 4999,
      qty: 1,
      stock: "In Stock",
      image: "https://picsum.photos/300/200?random=2",
    },
    {
      id: 3,
      name: "HP LaserJet Printer",
      spec: "Monochrome • WiFi • Fast Print",
      price: 8999,
      mrp: 10999,
      qty: 1,
      stock: "In Stock",
      image: "https://picsum.photos/300/200?random=3",
    },
    {
      id: 4,
      name: "Cisco Network Switch",
      spec: "8 Port • Gigabit • Managed",
      price: 3299,
      mrp: 3999,
      qty: 1,
      stock: "Limited Stock",
      image: "https://picsum.photos/300/200?random=4",
    },
    {
      id: 5,
      name: "Kingston SSD Drive",
      spec: "512GB • SATA • High Speed",
      price: 2899,
      mrp: 3499,
      qty: 1,
      stock: "In Stock",
      image: "https://picsum.photos/300/200?random=5",
    },
    {
      id: 6,
      name: "Dell Server RAM",
      spec: "16GB • DDR4 • ECC Support",
      price: 3499,
      mrp: 4299,
      qty: 1,
      stock: "In Stock",
      image: "https://picsum.photos/300/200?random=6",
    },

    {
      id: 7,
      name: "Logitech Wireless Mouse",
      spec: "2.4GHz • Optical • Ergonomic",
      price: 799,
      mrp: 999,
      qty: 1,
      stock: "In Stock",
      image: "https://picsum.photos/300/200?random=7",
    },
    {
      id: 8,
      name: "Dell Wired Keyboard",
      spec: "USB • Silent Keys • Full Size",
      price: 899,
      mrp: 1199,
      qty: 1,
      stock: "In Stock",
      image: "https://picsum.photos/300/200?random=8",
    },
    {
      id: 9,
      name: "Acer 24-inch Monitor",
      spec: "Full HD • IPS • 75Hz",
      price: 7499,
      mrp: 8999,
      qty: 1,
      stock: "In Stock",
      image: "https://picsum.photos/300/200?random=9",
    },
    {
      id: 10,
      name: "AMD Ryzen 5 Processor",
      spec: "6-Core • 12-Thread • AM4",
      price: 12999,
      mrp: 14999,
      qty: 1,
      stock: "Limited Stock",
      image: "https://picsum.photos/300/200?random=10",
    },
    {
      id: 11,
      name: "NVIDIA GTX 1650 GPU",
      spec: "4GB GDDR5 • Gaming • PCIe",
      price: 14999,
      mrp: 16999,
      qty: 1,
      stock: "In Stock",
      image: "https://picsum.photos/300/200?random=11",
    },
    {
      id: 12,
      name: "Zebronics Gaming Headset",
      spec: "Surround Sound • Mic • Wired",
      price: 1299,
      mrp: 1599,
      qty: 1,
      stock: "In Stock",
      image: "https://picsum.photos/300/200?random=12",
    },
    {
      id: 13,
      name: "Sandisk USB Flash Drive",
      spec: "64GB • USB 3.0 • High Speed",
      price: 499,
      mrp: 699,
      qty: 1,
      stock: "In Stock",
      image: "https://picsum.photos/300/200?random=13",
    },
    {
      id: 14,
      name: "TP-Link WiFi Extender",
      spec: "Dual Band • Range Boost • Plug-in",
      price: 1999,
      mrp: 2499,
      qty: 1,
      stock: "In Stock",
      image: "https://picsum.photos/300/200?random=14",
    },
    {
      id: 15,
      name: "HP Ink Cartridge Set",
      spec: "Color + Black • Original Ink",
      price: 1799,
      mrp: 2199,
      qty: 1,
      stock: "In Stock",
      image: "https://picsum.photos/300/200?random=15",
    },
    {
      id: 16,
      name: "Lenovo Laptop Battery",
      spec: "6-cell • Li-ion • Replacement",
      price: 2499,
      mrp: 2999,
      qty: 1,
      stock: "Limited Stock",
      image: "https://picsum.photos/300/200?random=16",
    },
    {
      id: 17,
      name: "ASUS Motherboard",
      spec: "B450 • AM4 • DDR4 Support",
      price: 6499,
      mrp: 7499,
      qty: 1,
      stock: "In Stock",
      image: "https://picsum.photos/300/200?random=17",
    },
    {
      id: 18,
      name: "Cooler Master CPU Fan",
      spec: "RGB • High Airflow • Quiet",
      price: 1399,
      mrp: 1699,
      qty: 1,
      stock: "In Stock",
      image: "https://picsum.photos/300/200?random=18",
    },
    {
      id: 19,
      name: "Ubiquiti Access Point",
      spec: "Enterprise WiFi • PoE • Dual Band",
      price: 7999,
      mrp: 8999,
      qty: 1,
      stock: "In Stock",
      image: "https://picsum.photos/300/200?random=19",
    },
    {
      id: 20,
      name: "Seagate NAS HDD",
      spec: "2TB • 7200RPM • RAID Ready",
      price: 5499,
      mrp: 6499,
      qty: 1,
      stock: "In Stock",
      image: "https://picsum.photos/300/200?random=20",
    },
  ];
  const ITEMS_PER_PAGE = 12;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProducts = products.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  return (
    <section className="py-8 sm:py-10 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* SHOP HEADER */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Shop Products</h2>
          <p className="text-gray-500 mt-1">
            Best IT hardware at unbeatable prices
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {currentProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="mt-8">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductGrid;

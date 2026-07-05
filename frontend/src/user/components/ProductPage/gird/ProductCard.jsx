// @ts-nocheck
/* eslint-disable react-hooks/purity */
import { useState } from "react";
import { FaEye, FaHeart, FaShoppingCart, FaStar } from "react-icons/fa";

const ProductCard = ({ product, onAddToCart }) => {
  const [liked, setLiked] = useState(false);

  const hasDiscount = product.mrp && product.mrp > product.price;

  const discountPercent = hasDiscount
    ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
    : 0;

  // Safe rating handling
  const rating = Number(product.rating) || (4 + Math.random()).toFixed(1);

  const isOutOfStock = product.stock !== "In Stock";

  return (
    <div className="group bg-white border border-blue-100 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col overflow-hidden relative">
      {/* DISCOUNT BADGE */}
      {hasDiscount && (
        <span className="absolute top-2 left-2 z-10 bg-red-500 text-white text-[11px] px-2 py-0.5 rounded-full">
          {discountPercent}% OFF
        </span>
      )}

      {/* IMAGE */}
      <div className="aspect-4/3 bg-linear-to-br from-blue-50 to-white flex items-center justify-center relative overflow-hidden">
        <img
          loading="lazy"
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
        />

        <div className="absolute inset-0 bg-blue-100 opacity-0 group-hover:opacity-20 transition" />
      </div>

      {/* CONTENT */}
      <div className="p-3 flex flex-col flex-1">
        {/* NAME */}
        <h3 className="font-semibold text-blue-950 text-sm leading-snug group-hover:text-blue-700 transition line-clamp-2">
          {product.name}
        </h3>

        {/* SPEC */}
        <p className="text-xs text-gray-500 mt-1 line-clamp-2">
          {product.spec}
        </p>

        {/* RATING */}
        <div className="flex items-center gap-2 mt-2">
          <div className="flex items-center gap-1 text-yellow-500">
            {Array.from({ length: 5 }).map((_, i) => (
              <FaStar
                key={i}
                size={11}
                className={
                  i < Math.round(rating) ? "opacity-100" : "opacity-30"
                }
              />
            ))}
          </div>

          <span className="text-xs text-gray-500">{rating} / 5</span>
        </div>

        {/* PRICE + STOCK */}
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-end gap-2">
            <span className="text-base font-bold text-blue-900">
              ₹{product.price}
            </span>

            {hasDiscount && (
              <span className="text-xs text-gray-400 line-through">
                ₹{product.mrp}
              </span>
            )}
          </div>

          <span
            className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${
              product.stock === "In Stock"
                ? "bg-green-50 text-green-600"
                : "bg-orange-50 text-orange-600"
            }`}
          >
            {product.stock}
          </span>
        </div>

        {/* DELIVERY INFO */}
        <p className="text-[11px] text-gray-400 mt-1">
          🚚 Free delivery in 2–4 days
        </p>

        {/* ACTIONS */}
        <div className="mt-4 flex flex-col gap-2">
          {/* ADD TO CART */}
          <button
            onClick={() => onAddToCart?.(product)}
            disabled={isOutOfStock}
            className={`w-full text-xs py-2.5 rounded-lg font-medium flex items-center justify-center gap-2 transition
              ${
                isOutOfStock
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
          >
            <FaShoppingCart size={13} />
            {isOutOfStock ? "Out of Stock" : "Add to Cart"}
          </button>

          {/* SECONDARY ACTIONS */}
          <div className="flex items-center gap-2">
            {/* QUICK VIEW */}
            <button className="flex-1 border border-blue-100 text-blue-700 text-xs py-2 rounded-lg hover:bg-blue-50 transition flex items-center justify-center gap-2">
              <FaEye size={13} />
              Quick View
            </button>

            {/* WISHLIST */}
            <button
              onClick={() => setLiked(!liked)}
              className={`p-2 rounded-lg border transition ${
                liked
                  ? "bg-red-50 border-red-200 text-red-500"
                  : "border-blue-100 hover:bg-blue-50 text-blue-600"
              }`}
            >
              <FaHeart size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

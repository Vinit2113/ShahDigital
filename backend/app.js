const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/auth.routes");
const adminRoutes = require("./routes/admin.routes");
const catRoutes = require("./routes/category.routes");
const brandRoutes = require("./routes/brands.routes");
const attributeRoutes = require("./routes/attribute.routes");
const catAttributeRoutes = require("./routes/catAttribute.routes");
const productRoutes = require("./routes/product.routes");
const productAttributesRoutes = require("./routes/productAttribute.routes");
const productMediaRoutes = require("./routes/productMedia.routes");
const productFeaturesRoutes = require("./routes/productFeatures.routes");
const userAddressRoutes = require("./routes/userAddress.routes");
const addCartRoutes = require("./routes/cart.routes");
// FIX: this was commented out (and the routes file it points to didn't
// even exist yet) - the catalogue page's "Enquire Now" form has been
// POSTing to a dead endpoint. Routes file now exists at
// backend/routes/contactModelEnquiries.routes.js.
const contactModelEnquiriesRoutes = require("./routes/contactModelEnquiries.routes");
const cookieParser = require("cookie-parser");

app.use(
  cors({
    origin: "http://localhost:2040",
    credentials: true,
  }),
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/auth", authRoutes, adminRoutes);
app.use("/category", catRoutes);
app.use("/attribute", attributeRoutes);
app.use("/brands", brandRoutes);
app.use("/catAttribute", catAttributeRoutes);
app.use("/products", productRoutes, productMediaRoutes);
app.use("/product-Attributes", productAttributesRoutes);
app.use("/product-Features", productFeaturesRoutes);
app.use("/contact-form", contactModelEnquiriesRoutes);
app.use("/cart", addCartRoutes);
app.use("/user-address", userAddressRoutes);

module.exports = app;

const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const helmet = require("helmet");

// Trust the first hop (the IIS/nginx reverse proxy this sits behind in
// production) so req.ip and express-rate-limit read the real client IP
// from X-Forwarded-For instead of treating every request as coming from
// the proxy itself.
app.set("trust proxy", 1);

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

const contactModelEnquiriesRoutes = require("./routes/contactModelEnquiries.routes");
const cookieParser = require("cookie-parser");

// crossOriginResourcePolicy is relaxed to "cross-origin" so that
// /uploads images/videos can still be embedded by the frontend, which
// runs on a different origin - helmet's "same-origin" default would
// otherwise block the browser from loading them.
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:2040",
    credentials: true,
  }),
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
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

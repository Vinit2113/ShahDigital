const express = require("express");
const app = express();
const cors = require("cors");

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

app.use(
  cors({
    origin: "http://localhost:2040",
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRoutes, adminRoutes);
app.use("/category", catRoutes);
app.use("/attribute", attributeRoutes);
app.use("/brands", brandRoutes);
app.use("/catAttribute", catAttributeRoutes);
app.use("/products", productRoutes, productMediaRoutes);
app.use("/product-Attributes", productAttributesRoutes);
app.use("/product-Features", productFeaturesRoutes);

module.exports = app;

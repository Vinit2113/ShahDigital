import api from "../api/axiosInstance";

// CREATE - cat_id/brand_id go in the URL (backend/routes/product.routes.js),
// the rest is a plain JSON body.
const createProductApi = (catId, brandId, data) => {
  return api.post(`products/insert/cat-${catId}/brand-${brandId}`, data, {
    withCredentials: true,
  });
};

// Admin-only list - powers ListProduct.jsx. Returns every product
// (active/inactive/deleted) unlike the public "list" endpoint.
const fetchProductListAdmin = () => {
  return api.post(
    "products/admin-list",
    {},
    {
      withCredentials: true,
    },
  );
};

const getProductByIdApi = (productId) => {
  return api.post(
    `products/detail/${productId}`,
    {},
    {
      withCredentials: true,
    },
  );
};

const updateProductApi = (productId, data) => {
  return api.post(`products/update-product-${productId}`, data, {
    withCredentials: true,
  });
};

const deleteProductApi = (productId) => {
  return api.post(
    `products/delete-product-${productId}`,
    {},
    {
      withCredentials: true,
    },
  );
};

const restoreProductApi = (productId) => {
  return api.post(
    `products/restore-product-${productId}`,
    {},
    {
      withCredentials: true,
    },
  );
};

// MEDIA - multipart/form-data. imageFiles is an array of File (up to 10),
// videoFile is a single optional File.
const uploadProductMediaApi = (productId, imageFiles, videoFile) => {
  const payload = new FormData();

  imageFiles.forEach((file) => payload.append("product_image", file));
  if (videoFile) payload.append("product_video", videoFile);

  return api.post(`products/add/${productId}/media`, payload, {
    withCredentials: true,
  });
};

const deleteProductMediaApi = (mediaId) => {
  return api.post(
    `products/delete/${mediaId}/media`,
    {},
    {
      withCredentials: true,
    },
  );
};

// FEATURES
// Returns [{ feature_id, feature_name }] - needed (not just the name
// string) so an individual feature can be deleted later.
const listProductFeaturesApi = (productId) => {
  return api.post(
    `product-Features/list-features/${productId}`,
    {},
    {
      withCredentials: true,
    },
  );
};

const addProductFeaturesApi = (productId, featureNames) => {
  return api.post(
    `product-Features/insert/${productId}`,
    { feature_name: featureNames },
    {
      withCredentials: true,
    },
  );
};

const deleteProductFeatureApi = (featureId) => {
  return api.post(
    `product-Features/delete-features/${featureId}`,
    {},
    {
      withCredentials: true,
    },
  );
};

export default {
  createProductApi,
  fetchProductListAdmin,
  getProductByIdApi,
  updateProductApi,
  deleteProductApi,
  restoreProductApi,
  uploadProductMediaApi,
  deleteProductMediaApi,
  listProductFeaturesApi,
  addProductFeaturesApi,
  deleteProductFeatureApi,
};

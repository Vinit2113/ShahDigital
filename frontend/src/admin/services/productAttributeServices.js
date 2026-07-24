import api from "../api/axiosInstance";

// Links a single attribute value to a product (backend/controllers/product_attributes/createProductAttribute.controller.js).
// One call per attribute - the backend only accepts one (product_id, attribute_id, attribute_value) triple at a time.
const createProductAttributeApi = (productId, attributeId, attributeValue) => {
  return api.post(
    "product-Attributes/insert/",
    {
      product_id: productId,
      attribute_id: attributeId,
      attribute_value: attributeValue,
    },
    {
      withCredentials: true,
    },
  );
};

// listProductAttribute.controller.js reads product_id off req.query, not req.body,
// so it goes through axios' `params` (query string) even though this is a POST.
const listProductAttributesApi = (productId) => {
  return api.post(
    "product-Attributes/list/",
    {},
    {
      params: { product_id: productId },
      withCredentials: true,
    },
  );
};

const updateProductAttributeApi = (productAttributeId, attributeValue) => {
  return api.post(
    `product-Attributes/update/${productAttributeId}`,
    { attribute_value: attributeValue },
    {
      withCredentials: true,
    },
  );
};

const deleteProductAttributeApi = (productAttributeId) => {
  return api.post(
    `product-Attributes/delete/${productAttributeId}`,
    {},
    {
      withCredentials: true,
    },
  );
};

export default {
  createProductAttributeApi,
  listProductAttributesApi,
  updateProductAttributeApi,
  deleteProductAttributeApi,
};

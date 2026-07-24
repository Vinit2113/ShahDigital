import api from "../api/axiosInstance";

// Powers ListCatalogue.jsx (admin "Catalogue" dashboard page) - hits the
// same no-pricing endpoint the public catalogue page uses
// (backend/routes/catalogue.routes.js), just viewed through the admin
// shell so admins can preview what's actually shown there.
const fetchCatalogueList = () => {
  return api.post(
    "catalogue/list",
    {},
    {
      withCredentials: true,
    },
  );
};

// Admin-only list - unlike fetchCatalogueList above, returns every product
// (active/inactive/deleted) so ListCatalogue.jsx can manage them, not just
// preview the public feed.
const fetchCatalogueListAdmin = () => {
  return api.post(
    "catalogue/admin-list",
    {},
    {
      withCredentials: true,
    },
  );
};

// CREATE/UPDATE/DELETE/RESTORE - catalogue-facing fields only (name,
// descriptions, category, brand). No pricing/stock inputs exist on these
// endpoints at all (backend/controllers/catalogue/*CatalogueProduct.controller.js) -
// pricing/stock stay exclusive to productsServices.js. Features and images
// are managed via productsServices.js's feature/media calls directly, since
// those already operate per product_id regardless of which admin section
// triggered them.
const createCatalogueProductApi = (catId, brandId, data) => {
  return api.post(`catalogue/insert/cat-${catId}/brand-${brandId}`, data, {
    withCredentials: true,
  });
};

const updateCatalogueProductApi = (productId, data) => {
  return api.post(`catalogue/update-${productId}`, data, {
    withCredentials: true,
  });
};

const deleteCatalogueProductApi = (productId) => {
  return api.post(
    `catalogue/delete-${productId}`,
    {},
    {
      withCredentials: true,
    },
  );
};

const restoreCatalogueProductApi = (productId) => {
  return api.post(
    `catalogue/restore-${productId}`,
    {},
    {
      withCredentials: true,
    },
  );
};

export default {
  fetchCatalogueList,
  fetchCatalogueListAdmin,
  createCatalogueProductApi,
  updateCatalogueProductApi,
  deleteCatalogueProductApi,
  restoreCatalogueProductApi,
};

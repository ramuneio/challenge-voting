export const productsApiRoutes = {
  all: () => `${CONFIG.apiHost}/api/v1/products`,
  vote: id => `${CONFIG.apiHost}/api/v1/products/${id}/vote`
};

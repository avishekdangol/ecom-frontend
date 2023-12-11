import jwtDefaultConfig from '../jwtDefaultConfig';

const productServices = {
  getProducts() {
    return this.axiosIns.get(jwtDefaultConfig.productsEndpoint);
  },

  storeProduct(args) {
    return this.axiosIns.post(jwtDefaultConfig.productsEndpoint, args);
  },

  updateProduct(id, args) {
    return this.axiosIns.patch(`${jwtDefaultConfig.productsEndpoint}/${id}`, args);
  },

  deleteProduct(id) {
    return this.axiosIns.delete(`${jwtDefaultConfig.productsEndpoint}/${id}`);
  },

  deleteBulkProducts(args) {
    return this.axiosIns.post(`${jwtDefaultConfig.productsEndpoint}/bulk-delete`, args);
  },
};

export default productServices;

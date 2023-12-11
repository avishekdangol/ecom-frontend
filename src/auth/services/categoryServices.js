import jwtDefaultConfig from '../jwtDefaultConfig';

const categoryServices = {
  getCategories() {
    return this.axiosIns.get(jwtDefaultConfig.categoriesEndpoint);
  },

  storeCategory(args) {
    return this.axiosIns.post(jwtDefaultConfig.categoriesEndpoint, args);
  },

  updateCategory(id, args) {
    return this.axiosIns.patch(`${jwtDefaultConfig.categoriesEndpoint}/${id}`, args);
  },

  deleteCategory(id) {
    return this.axiosIns.delete(`${jwtDefaultConfig.categoriesEndpoint}/${id}`);
  },

  deleteBulkCategories(args) {
    return this.axiosIns.post(`${jwtDefaultConfig.categoriesEndpoint}/bulk-delete`, args);
  },
};

export default categoryServices;

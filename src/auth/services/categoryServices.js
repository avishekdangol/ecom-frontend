import jwtDefaultConfig from '../jwtDefaultConfig';

const categoryServices = {
  getCategories() {
    return this.axiosIns.get(jwtDefaultConfig.categoryEndpoint);
  },

  storeCategory(args) {
    return this.axiosIns.post(jwtDefaultConfig.categoryEndpoint, args);
  },

  updateCategory(args) {
    return this.axiosIns.patch(jwtDefaultConfig.categoryEndpoint, args);
  },

  deleteCategory(id) {
    return this.axiosIns.delete(jwtDefaultConfig.categoryEndpoint, id);
  },

  deleteBulkCategories(args) {
    return this.axiosIns.post(`${jwtDefaultConfig.categoryEndpoint}/bulk/delete`, args);
  },
};

export default categoryServices;

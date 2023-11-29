import jwtDefaultConfig from '../jwtDefaultConfig';

const userServices = {
  updateProfile(args) {
    return this.axiosIns.patch(jwtDefaultConfig.usersEndpoint, args);
  },

  getCountries() {
    return this.axiosIns.get(jwtDefaultConfig.countriesEndpoint);
  },

  changePassword(args) {
    return this.axiosIns.patch(`${jwtDefaultConfig.usersEndpoint}/change-password`, args);
  },
};

export default userServices;

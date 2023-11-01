import jwtDefaultConfig from '../jwtDefaultConfig';

const usersService = {
  updateProfile(args) {
    return this.axiosIns.patch(jwtDefaultConfig.usersEndpoint, args);
  },

  getCountries() {
    return this.axiosIns.get(jwtDefaultConfig.countriesEndpoint);
  },
};

export default usersService;

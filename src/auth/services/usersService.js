import jwtDefaultConfig from '../jwtDefaultConfig';

const usersService = {
  updateProfile(args) {
    return this.axiosIns.patch(jwtDefaultConfig.usersEndpoint, args);
  },
};

export default usersService;

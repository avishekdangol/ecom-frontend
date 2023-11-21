const authService = {
  // Auth Api
  login(args) {
    return this.axiosIns.post('/login', args);
  },

  register(args) {
    return this.axiosIns.post('/register', args);
  },

  logout() {
    return this.axiosIns.get('/logout');
  },

  requestServer(url) {
    return this.axiosIns.get(url);
  },

  forgotPassword(args) {
    return this.axiosIns.post('/forgot-password', args);
  },

  resetPassword(args) {
    return this.axiosIns.post('/reset-password', args);
  },

  resendEmailVerification() {
    return this.axiosIns.post('/resend-email-verification');
  },
};

export default authService;

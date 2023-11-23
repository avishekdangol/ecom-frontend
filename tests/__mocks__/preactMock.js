export const effect = jest.fn();
export const signal = jest.fn(() => ({
  isLoggedIn: {
    value: false,
  },
}));

import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';

// Mocks
jest.mock('@/auth/useJwt', () => ({
  get: jest.fn(() => Promise.resolve({ data: [] })),
}));

jest.mock('@/utils/AuthContext', () => ({
  __esModule: true,
  AuthContext: { Provider: ({ children }) => children },
  useAuth: jest.fn(() => ({
    login: jest.fn(),
  })),
  // eslint-disable-next-line react/jsx-props-no-spreading, react/jsx-filename-extension
  withAuthentication: (Component) => (props) => <Component {...props} />,
}));

function AllProviders({ children }) {
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <BrowserRouter>
      {children}
    </BrowserRouter>
  );
}

AllProviders.propTypes = {
  children: PropTypes.node.isRequired,
};

const customRender = (ui, options) => render(ui, { wrapper: AllProviders, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };

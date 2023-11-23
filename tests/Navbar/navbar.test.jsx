// import { screen } from '@testing-library/react';
import { render } from '@root/tests/testUtils';
import Navbar from '@/components/navbar/Index.jsx';

jest.mock('@/auth/useJwt', () => ({
  get: jest.fn(() => Promise.resolve({ data: [] })),
}));

describe('Navbar', () => {
  test('snapshot', () => {
    const { asFragment } = render(<Navbar />);
    expect(asFragment()).toMatchSnapshot();
  });
});

import { screen } from '@testing-library/react';
import { render } from '@root/tests/testUtils';
import Navbar from '@/components/navbar/Index.jsx';

describe('Navbar', () => {
  test('snapshot when user isn\'t logged in', () => {
    const { asFragment } = render(<Navbar isLoggedIn={false} />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('snapshot when user is logged in', () => {
    const { asFragment } = render(<Navbar isLoggedIn />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('if user is not logged in, they should see login | register button', () => {
    render(<Navbar isLoggedIn={false} />);
    const component = screen.getByText(/login | register/i);
    expect(component).toBeInTheDocument();
  });

  test('if user is logged in, they should see usermenu button', () => {
    render(<Navbar isLoggedIn />);
    const component = screen.queryByText(/login | register/i);
    expect(component).not.toBeInTheDocument();
  });
});

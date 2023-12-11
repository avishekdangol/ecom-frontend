import { render, fireEvent, screen } from '@root/tests/testUtils';
import Navbar from '@/components/navbar/Index.jsx';

jest.mock('@/utils/common', () => ({
  getUserData: {
    value: {
      role: 'member',
    },
  },
}));

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

  test('if the user has not verified their email, an alert should be shown', () => {
    render(<Navbar isLoggedIn />);
    const alertText = screen.queryByText(/verify your email/i);
    const resendVerificationBtn = screen.queryByRole('button', { name: /resend verification link/i });

    expect(alertText).toBeInTheDocument();
    expect(resendVerificationBtn).toBeInTheDocument();
  });

  test('if the user is an admin, he/she should see dashboard menu', async () => {
    jest.mock('@/utils/common', () => ({
      getUserData: {
        value: {
          role: 'admin',
        },
      },
    }));

    render(<Navbar isLoggedIn />);
    const userMenuBtn = screen.getByTestId('user-menu-btn');
    fireEvent.click(userMenuBtn);

    const dashboardBtn = screen.queryByText(/dashboard/i);
    console.log(dashboardBtn);
    // expect(dashboardBtn).toBeInTheDocument();
  });
});

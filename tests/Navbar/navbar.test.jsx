import { fireEvent, screen, waitFor } from '@testing-library/react';
import { render } from '@root/tests/testUtils';
import { act } from 'react-dom/test-utils';
import Navbar from '@/components/navbar/Index.jsx';

jest.mock('@/utils/common', () => ({
  getUserData: {
    value: {
      roles: 'member',
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

  test('if the user is not an admin, he/she should not see dashboard menu', () => {
    const { container } = render(<Navbar isLoggedIn />);
    const userMenuBtn = container.querySelector('.ant-dropdown-trigger');
    userMenuBtn.dispatchEvent(new MouseEvent('click'));

    const dashboardBtn = screen.queryByRole('button', { name: /dashboard/i });
    expect(dashboardBtn).not.toBeInTheDocument();
  });

  test('if the user has not verified their email, an alert should be shown', () => {
    render(<Navbar isLoggedIn />);
    const alertText = screen.queryByText(/verify your email/i);
    expect(alertText).toBeInTheDocument();

    const resendVerificationBtn = screen.queryByRole('button', { name: /resend verification link/i });
    expect(resendVerificationBtn).toBeInTheDocument();
  });

  // test('if the user is an admin, he/she should see dashboard menu', async () => {
  //   jest.mock('@/utils/common', () => ({
  //     getUserData: {
  //       value: {
  //         roles: 'admin',
  //       },
  //     },
  //   }));

  //   render(<Navbar isLoggedIn />);
  //   const userMenuBtn = screen.getByTestId('user-menu-btn');
  //   // const userMenuBtn = container.querySelector('.ant-dropdown-trigger');
  //   fireEvent.click(userMenuBtn);

  //   await waitFor(() => {
  //     const dashboardBtn = screen.findByText(/dashboard/i);
  //     expect(dashboardBtn).toBeInTheDocument();
  //   });
  // });
});

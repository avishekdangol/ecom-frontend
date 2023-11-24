import { render } from '@root/tests/testUtils';
import Login from '@/pages/Auth/Login';

describe('Login', () => {
  test('snapshot', () => {
    const { asFragment } = render(<Login />);
    expect(asFragment()).toMatchSnapshot();
  });
});

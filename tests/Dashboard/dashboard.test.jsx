import { render } from '@root/tests/testUtils';
import Dashboard from '@/pages/Dashboard/Index';

describe('Dashboard', () => {
  test('snapshot', () => {
    const { asFragment } = render(<Dashboard />);
    expect(asFragment()).toMatchSnapshot();
  });
});

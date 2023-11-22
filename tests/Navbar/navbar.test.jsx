import { render, screen } from '@testing-library/react';
import Navbar from '@/components/navbar/Index.jsx';

describe('Navbar', () => {
  test('snapshot', () => {
    render(<Navbar />);
    const menu = screen.getByText(/menu/i);
    expect(menu).toBeInTheDocument();
  });
});

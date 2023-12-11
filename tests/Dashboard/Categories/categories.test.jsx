import {
  render, screen, fireEvent, waitFor,
} from '@root/tests/testUtils';
import Categories from '@/pages/Dashboard/Categories/Index';
import useCategories from '@/pages/Dashboard/Categories/useCategories';

jest.mock('@/utils/common', () => ({
  getUserData: {
    value: {
      role: 'admin',
    },
  },
}));

jest.mock('@/pages/Dashboard/Categories/useCategories.js', () => ({
  columns: [{
    title: 'Name',
    dataIndex: 'name',
    width: '25%',
    editable: true,
  }],
  fetchCategories: jest.fn(),
  getCategoriesList: jest.fn(() => []),
  getShowAddCategoryModal: jest.fn(() => false),
  toggleAddCategoryModal: jest.fn(),
}));

describe('Categories', () => {
  test('snapshot', () => {
    const { asFragment } = render(<Categories />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('category page loads successfully', () => {
    render(<Categories />);
    const categoriesTitle = screen.getByRole('heading', { level: 1, name: /categories/i });

    expect(categoriesTitle).toBeInTheDocument();
  });

  test('category page has add category button', () => {
    render(<Categories />);
    const addCategoryBtn = screen.getByRole('button', { name: /add categories/i });

    expect(addCategoryBtn).toBeInTheDocument();
  });

  // test('add category modal opens when the add category button is clicked', async () => {
  //   render(<Categories />);
  //   const addCategoryBtn = screen.getByRole('button', { name: /add categories/i });

  //   fireEvent.click(addCategoryBtn);

  //   const addNewCategoryTitle = await waitFor(() => screen.getByText(/add new/i));

  //   expect(addNewCategoryTitle).toBeInTheDocument();
  // });

  test('show no data message when the table is empty', () => {
    render(<Categories />);
    const emptyMessage = screen.getByText(/no data/i);

    expect(emptyMessage).toBeInTheDocument();
  });

  test('show data when the table has data', () => {
    useCategories.getCategoriesList.mockImplementation(() => [{ id: 1, name: 'Trainers' }]);
    render(<Categories />);
    const data = screen.getByText(/trainers/i);

    expect(data).toBeInTheDocument();
  });
});

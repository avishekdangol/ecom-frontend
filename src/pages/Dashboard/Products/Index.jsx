import { signal } from '@preact/signals-react';
import DashLayout from '@/layouts/DashLayout';
import AntTable from '@/components/reusables/AntTable';
import jwt from '@/auth/useJwt';
import showNotification from '@/utils/Toasts';

const products = signal([]);
const productsMeta = signal({});
const showAddProductModal = signal(false);
const isLoading = signal(false);

// fetch products
const getProducts = () => {
  isLoading.value = true;
  jwt.getProducts().then((response) => {
    const { data, ...rest } = response.data.data;
    products.value = data;
    productsMeta.value = rest;
  }).catch(({ response }) => {
    if (response) {
      const errors = Object.values(response.data.errors);
      showNotification('error', response, errors[0]);
    }
  }).finally(() => {
    isLoading.value = false;
  });
};

// table columns
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    width: '25%',
    editable: true,
  },
];

// toggle products modal
const toggleAddProductModal = (show = true) => {
  showAddProductModal.value = show;
};

function Products() {
  return (
    <DashLayout>
      <AntTable
        title="Products"
        data={products.value}
        addData={toggleAddProductModal}
        refetchData={getProducts}
        columns={columns}
        updateApi="updateCategory"
        deleteApi="deleteCategory"
        bulkDeleteApi="deleteBulkCategories"
      />
    </DashLayout>
  );
}

export default Products;

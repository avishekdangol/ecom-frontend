import DashLayout from '@/layouts/DashLayout';
import AntTable from '@/components/reusables/AntTable';
import {
  fetchProducts, toggleAddProductModal, getProductsList, getProductsMeta, getShowAddProductModal, columns,
} from './useProducts';

function Products() {
  return (
    <DashLayout>
      <AntTable
        title="Products"
        data={getProductsList()}
        addData={toggleAddProductModal}
        refetchData={fetchProducts}
        columns={columns}
        updateApi="updateProduct"
        deleteApi="deleteProduct"
        bulkDeleteApi="deleteBulkProducts"
      />
    </DashLayout>
  );
}

export default Products;

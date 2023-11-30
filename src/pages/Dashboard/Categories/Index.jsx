import { signal } from '@preact/signals-react';
import { useEffect } from 'react';
import {
  Button, Input, Modal,
} from 'antd';
import { Form, Formik } from 'formik';
import jwt from '@/auth/useJwt';
import DashLayout from '@/layouts/DashLayout';
import AntTable from '@/components/reusables/AntTable';
import showNotification from '@/utils/Toasts';
import CategorySchema from './validations/CategorySchema';
import ProcessingSpin from '@/components/reusables/ProcessingSpin';

const categories = signal([]);
const categoriesMeta = signal({});
const isLoading = signal(false);
const showAddCategoryModal = signal(false);

const getCategories = () => {
  isLoading.value = true;
  jwt.getCategories().then((response) => {
    const { data, ...rest } = response.data.data;
    categories.value = data;
    categoriesMeta.value = rest;
  }).catch(({ response }) => {
    if (response) {
      const errors = Object.values(response.data.errors);
      showNotification('error', response, errors[0]);
    }
  }).finally(() => {
    isLoading.value = false;
  });
};

const setCategories = (data) => {
  categories.value = data;
};

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    width: '25%',
    editable: true,
  },
];

const toggleAddCategoryModal = (show = true) => {
  showAddCategoryModal.value = show;
};

function Categories() {
  useEffect(() => { getCategories(); }, []);
  return (
    <DashLayout>
      <AntTable
        title="Categories"
        data={categories.value}
        addData={toggleAddCategoryModal}
        setData={setCategories}
        columns={columns}
        updateApi="updateCategory"
        deleteApi="deleteCategory"
        bulkDeleteApi="deleteBulkCategories"
      />

      <Modal
        open={showAddCategoryModal.value}
        title="Add New Category"
        footer={null}
        onCancel={() => { toggleAddCategoryModal(false); }}
      >
        <Formik
          initialValues={{
            name: '',
          }}
          validationSchema={CategorySchema}
          onSubmit={(values, actions) => {
            jwt.storeCategory(values).then((response) => {
              showNotification('success', response);
              getCategories();
              toggleAddCategoryModal(false);
              actions.resetForm();
            }).catch(({ response }) => {
              if (response) {
                const errors = Object.values(response.data.errors);
                showNotification('error', response, errors[0]);
              }
            });
          }}
        >
          {({
            values, touched, errors, handleChange, handleSubmit, isSubmitting,
          }) => (
            <Form>
              <div className="mb-4">
                <Input
                  name="name"
                  type="text"
                  value={values.name}
                  placeholder="Category Name"
                  onPressEnter={handleSubmit}
                  onChange={handleChange}
                />
                <p className="mb-0">
                  {touched.name && errors.name && <small className="text-red-500">{errors.name}</small>}
                </p>
              </div>

              <div className="flex justify-end">
                <Button
                  disabled={isSubmitting}
                  onClick={() => { toggleAddCategoryModal(false); }}
                >
                  Cancel
                </Button>
                <Button
                  type="primary"
                  className="primary-btn ml-2"
                  disabled={isSubmitting}
                  onClick={handleSubmit}
                >
                  {
                  isSubmitting
                    ? <ProcessingSpin />
                    : 'Add'
                }
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal>
    </DashLayout>
  );
}
export default Categories;

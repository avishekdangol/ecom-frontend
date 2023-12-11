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
import ProcessingSpinButton from '@/components/reusables/ProcessingSpinButton';
import {
  columns,
  fetchCategories,
  getCategoriesList,
  getShowAddCategoryModal,
  toggleAddCategoryModal,
} from './useCategories.js';

function Categories() {
  useEffect(() => { fetchCategories(); }, []);
  return (
    <DashLayout>
      <AntTable
        title="Categories"
        data={getCategoriesList()}
        addData={toggleAddCategoryModal}
        refetchData={fetchCategories}
        columns={columns}
        updateApi="updateCategory"
        deleteApi="deleteCategory"
        bulkDeleteApi="deleteBulkCategories"
      />

      <Modal
        open={getShowAddCategoryModal()}
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
              fetchCategories();
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
            values, touched, errors, handleChange, handleSubmit, isSubmitting, resetForm,
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
                  onClick={() => { toggleAddCategoryModal(false); resetForm(); }}
                >
                  Cancel
                </Button>

                <ProcessingSpinButton
                  buttonClasses="primary-btn ml-2"
                  condition={isSubmitting}
                  text="Add"
                  action={handleSubmit}
                />
              </div>
            </Form>
          )}
        </Formik>
      </Modal>
    </DashLayout>
  );
}
export default Categories;

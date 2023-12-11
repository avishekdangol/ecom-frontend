import { signal } from '@preact/signals-react';
import jwt from '@/auth/useJwt';
import showNotification from '@/utils/Toasts';

const categories = signal([]);
const categoriesMeta = signal({});
const showAddCategoryModal = signal(false);

export const fetchCategories = () => {
  jwt.getCategories().then((response) => {
    const { data, ...rest } = response.data.data;

    categories.value = data;
    categoriesMeta.value = rest;
  }).catch(({ response }) => {
    if (response) {
      const errors = Object.values(response.data.errors);
      showNotification('error', response, errors[0]);
    }
  });
};

export const toggleAddCategoryModal = (show = true) => {
  showAddCategoryModal.value = show;
};

export const getCategoriesList = () => categories.value;
export const getCategoriesMeta = () => categoriesMeta.value;
export const getShowAddCategoryModal = () => showAddCategoryModal.value;

export const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    width: '25%',
    editable: true,
  },
];

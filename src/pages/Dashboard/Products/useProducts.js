import { signal } from '@preact/signals-react';
import jwt from '@/auth/useJwt';
import showNotification from '@/utils/Toasts';

const products = signal([]);
const productsMeta = signal({});
const showAddProductModal = signal(false);

export const fetchProducts = () => {
  jwt.getProducts().then((response) => {
    const { data, ...rest } = response.data.data;
    products.value = data;
    productsMeta.value = rest;
  }).catch(({ response }) => {
    if (response) {
      const errors = Object.values(response.data.errors);
      showNotification('error', response, errors[0]);
    }
  });
};

export const toggleAddProductModal = (show = true) => {
  showAddProductModal.value = show;
};

export const getProductsList = () => products.value;
export const getProductsMeta = () => productsMeta.value;
export const getShowAddProductModal = () => showAddProductModal.value;

export const columns = [
  {
    title: 'Image',
    dataIndex: 'image',
    width: '15%',
    editable: true,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    width: '20%',
    editable: true,
  },
  {
    title: 'Price',
    dataIndex: 'price',
    width: '10%',
    editable: true,
  },
  {
    title: 'Discount',
    dataIndex: 'discount',
    width: '10%',
    editable: true,
  },
  {
    title: 'Category',
    dataIndex: 'category',
    width: '15%',
    editable: true,
  },
];

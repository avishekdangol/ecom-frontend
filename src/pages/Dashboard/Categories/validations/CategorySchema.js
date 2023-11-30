import * as Yup from 'yup';

const CategorySchema = Yup.object().shape({
  name: Yup.string()
    .required('The name field is required'),
});

export default CategorySchema;

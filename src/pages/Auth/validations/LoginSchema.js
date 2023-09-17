// eslint-disable-next-line import/no-extraneous-dependencies
import * as Yup from 'yup';

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email format')
    .required('The email field is required'),
  password: Yup.string()
    .required('The password field is required'),
});

export default loginSchema;

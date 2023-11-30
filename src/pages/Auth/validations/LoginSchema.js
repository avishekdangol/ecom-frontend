import * as Yup from 'yup';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email format')
    .required('The email field is required'),
  password: Yup.string()
    .required('The password field is required'),
});

export default LoginSchema;

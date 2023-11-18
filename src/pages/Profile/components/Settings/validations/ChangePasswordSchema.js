// eslint-disable-next-line import/no-extraneous-dependencies
import * as Yup from 'yup';

const ChangePasswordSchema = Yup.object().shape({
  oldPassword: Yup.string()
    .min(8, 'Must be at least 8 characters long')
    .required('The password field is required'),
  password: Yup.string()
    .min(8, 'Must be at least 8 characters long')
    .notOneOf([Yup.ref('oldPassword'), null], 'New password shouldn\'t be the same as old password')
    .required('The password field is required'),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('The confirm field is required'),
});

export default ChangePasswordSchema;

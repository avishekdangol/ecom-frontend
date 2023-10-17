// eslint-disable-next-line import/no-extraneous-dependencies
import * as Yup from 'yup';

const ResetPassowrdSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, 'Must be at least 8 characters long')
    .required('The new password field is required'),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('The confirm password field is required'),
});

export default ResetPassowrdSchema;

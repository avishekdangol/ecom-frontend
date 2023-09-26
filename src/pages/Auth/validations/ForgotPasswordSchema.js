// eslint-disable-next-line import/no-extraneous-dependencies
import * as Yup from 'yup';

const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email format')
    .required('The email field is required'),
});

export default ForgotPasswordSchema;

// eslint-disable-next-line import/no-extraneous-dependencies
import * as Yup from 'yup';

const RegisterSchema = Yup.object().shape({
  firstName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('The first name field is required'),
  lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('The last name field is required'),
  email: Yup.string().email('Invalid Email!').required('The email field is required'),
  password: Yup.string()
    .min(8, 'Must be at least 8 characters long')
    .required('The password field is required'),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('The confirm field is required'),
  phone: Yup.string().required('The phone field is required'),
  gender: Yup.string().required('The gender field is required'),
  dateOfBirth: Yup.date()
    .required('The date of birth field is required')
    .max(new Date(), 'Date of birth cannot be in the future')
    .min(new Date('1990-01-01'), 'Date of birth cannot be earlier than 1900'),
});

export default RegisterSchema;

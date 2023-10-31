// eslint-disable-next-line import/no-extraneous-dependencies
import * as Yup from 'yup';

const ProfileSchema = Yup.object().shape({
  firstName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('The first name field is required'),
  lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('The last name field is required'),
  email: Yup.string()
    .email('Invalid email format')
    .required('The email field is required'),
  phone: Yup.string().required('The phone field is required'),
});

export default ProfileSchema;

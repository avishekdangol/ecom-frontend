import { Input, Checkbox, Button } from 'antd';
import { BiUser, BiLock } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import {
  Formik, Form,
} from 'formik';
import LoginSchema from './validations/LoginSchema';

function Login() {
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        remember: false,
      }}
      validationSchema={LoginSchema}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({
        values, touched, errors, handleChange, handleSubmit,
      }) => (
        <Form>
          <div className="mb-4">
            <Input
              id="email"
              name="email"
              type="email"
              value={values.email}
              placeholder="Email"
              prefix={<BiUser />}
              onChange={handleChange}
            />
            <p className="mb-0">
              {touched.email && errors.email && <small className="text-red-500">{errors.email}</small>}
            </p>
          </div>

          <div className="mb-4">
            <Input
              id="password"
              name="password"
              type="password"
              value={values.password}
              placeholder="Password"
              prefix={<BiLock />}
              onChange={handleChange}
            />
            <p className="mb-0">
              {touched.password && errors.password && <small className="text-red-500">{errors.password}</small>}
            </p>
          </div>

          <Checkbox
            id="remember"
            name="remember"
            checked={values.remember}
            onChange={handleChange}
          >
            Remember Me
          </Checkbox>

          <Button type="primary" className="primary-btn block my-6 w-full" onClick={handleSubmit}>
            Login
          </Button>

          <p className="text-xs text-center">
            Don&apos;t have an account?
            {' '}
            <Link
              to="/register"
              className="inline text-blue-700 underline hover:text-blue-500 hover:no-underline"
            >
              Create one.
            </Link>
          </p>
        </Form>
      )}
    </Formik>
  );
}

export default Login;

import {
  Input, Checkbox, Button, Spin,
} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { BiUser, BiLock } from 'react-icons/bi';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import {
  Formik, Form,
} from 'formik';
import { useState } from 'react';
import LoginSchema from './validations/LoginSchema';
import { showErrorNotification } from '@/utils/Toasts';
import { useAuth } from '@/utils/AuthContext';
import jwt from '@/auth/useJwt';
import { EncodeBase64 } from '@/utils/base64';

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const navigateHome = () => {
    navigate('/');
  };

  const [processing, setProcessing] = useState(false);
  const [passwordType, setPasswordType] = useState('password');

  const isProcessing = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const togglePasswordType = () => {
    setPasswordType(passwordType === 'password' ? 'text' : 'password');
  };

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        remember: false,
      }}
      validationSchema={LoginSchema}
      onSubmit={(values) => {
        setProcessing(true);
        jwt.login(values).then((response) => {
          // eslint-disable-next-line camelcase
          const { user, accessToken } = response.data;
          localStorage.setItem('userData', EncodeBase64(JSON.stringify(user)));
          localStorage.setItem('accessToken', accessToken);
          login();

          navigateHome();
        }).catch(({ response }) => {
          showErrorNotification('Login Failed!', response.data.message);
        }).finally(() => {
          setProcessing(false);
        });
      }}
    >
      {({
        values, touched, errors, handleChange, handleSubmit,
      }) => (
        <Form>
          {processing}
          <div className="mb-4">
            <Input
              id="email"
              name="email"
              type="email"
              value={values.email}
              placeholder="Email"
              prefix={<BiUser />}
              onPressEnter={handleSubmit}
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
              type={passwordType}
              value={values.password}
              placeholder="Password"
              prefix={<BiLock />}
              suffix={passwordType === 'password'
                ? (
                  <FaEye
                    className="cursor-pointer"
                    onClick={togglePasswordType}
                  />
                ) : (
                  <FaEyeSlash
                    className="cursor-pointer"
                    onClick={togglePasswordType}
                  />
                )}
              onPressEnter={handleSubmit}
              onChange={handleChange}
            />
            <p className="mb-0">
              {touched.password && errors.password && <small className="text-red-500">{errors.password}</small>}
            </p>
          </div>

          <div className="flex justify-between items-center">
            <Checkbox
              id="remember"
              name="remember"
              className="text-xs"
              checked={values.remember}
              onChange={handleChange}
            >
              Remember Me
            </Checkbox>

            <Link
              to="/forgot-password"
              className="text-xs text-blue-700 underline hover:text-blue-500 hover:no-underline"
            >
              Forgot Password?
            </Link>
          </div>

          <Button
            type="primary"
            className="primary-btn block my-6 w-full"
            disabled={processing}
            onClick={handleSubmit}
          >
            {
              processing
                ? <Spin indicator={isProcessing} />
                : 'Login'
            }
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

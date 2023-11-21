import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  BiUser, BiLock, BiPhone, BiEnvelope,
} from 'react-icons/bi';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Input, Button, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import {
  Formik, Form,
} from 'formik';
import RegisterSchema from './validations/RegisterSchema';
import jwt from '@/auth/useJwt';
import { useAuth } from '@/utils/AuthContext';
import showNotification from '@/utils/Toasts';
import { encodeBase64, setUserData } from '@/utils/common';

function Register() {
  const [passwordType, setPasswordType] = useState('password');
  const [confirmPasswordType, setConfirmPasswordType] = useState('password');
  const [processing, setProcessing] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const isProcessing = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const navigateHome = () => { navigate('/'); };
  const togglePasswordType = () => {
    setPasswordType(passwordType === 'password' ? 'text' : 'password');
  };
  const toggleConfirmPasswordType = () => {
    setConfirmPasswordType(confirmPasswordType === 'password' ? 'text' : 'password');
  };

  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordConfirmation: '',
        phone: '',
        role: 'member',
      }}
      validationSchema={RegisterSchema}
      onSubmit={(values) => {
        setProcessing(true);
        jwt.register(values).then((response) => {
          // eslint-disable-next-line camelcase
          const { user, accessToken } = response.data;
          setUserData(user);
          localStorage.setItem('userData', encodeBase64(JSON.stringify(user)));
          localStorage.setItem('accessToken', encodeBase64(accessToken));
          login();

          navigateHome();
        }).catch(({ response }) => {
          if (response) {
            const errors = Object.values(response.data.errors);
            showNotification('error', response.data.message, errors[0]);
          }
        }).finally(() => {
          setProcessing(false);
        });
      }}
    >
      {({
        values, errors, touched, handleSubmit, handleChange,
      }) => (
        <Form>
          <Spin spinning={processing} indicator={isProcessing}>
            <div className="flex justify-between">
              <div className="mx-2 mb-4">
                <Input
                  value={values.firstName}
                  className="w-60"
                  name="firstName"
                  placeholder="First Name"
                  prefix={<BiUser />}
                  onChange={handleChange}
                />
                <p className="mb-0">
                  {touched.firstName && errors.firstName && <small className="text-red-500">{errors.firstName}</small>}
                </p>
              </div>

              <div className="mx-2 mb-4">
                <Input
                  value={values.lastName}
                  className="w-60"
                  name="lastName"
                  placeholder="Last Name"
                  prefix={<BiUser />}
                  onChange={handleChange}
                />
                <p className="mb-0">
                  {touched.lastName && errors.lastName && <small className="text-red-500">{errors.lastName}</small>}
                </p>
              </div>
            </div>

            <div className="flex justify-between">
              <div className="mb-4 mx-2">
                <Input
                  name="email"
                  className="w-60"
                  value={values.email}
                  placeholder="Email"
                  prefix={<BiEnvelope />}
                  onChange={handleChange}
                />
                <p className="mb-0">
                  {touched.email && errors.email && <small className="text-red-500">{errors.email}</small>}
                </p>
              </div>

              <div className="mx-2 mb-4">
                <Input
                  name="phone"
                  className="w-60"
                  value={values.phone}
                  placeholder="Phone Number"
                  prefix={<BiPhone />}
                  onChange={handleChange}
                />
                <p className="mb-0">
                  {touched.phone && errors.phone && <small className="text-red-500">{errors.phone}</small>}
                </p>
              </div>
            </div>

            <div className="flex justify-between">
              <div className="mx-2 mb-4">
                <Input
                  name="password"
                  className="w-60"
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
                  onChange={handleChange}
                />
                <p className="mb-0">
                  {touched.password && errors.password && <small className="text-red-500">{errors.password}</small>}
                </p>
              </div>

              <div className="mx-2 mb-4">
                <Input
                  name="passwordConfirmation"
                  className="w-60"
                  type={confirmPasswordType}
                  value={values.passwordConfirmation}
                  placeholder="Confirm Password"
                  prefix={<BiLock />}
                  suffix={confirmPasswordType === 'password'
                    ? (
                      <FaEye
                        className="cursor-pointer"
                        onClick={toggleConfirmPasswordType}
                      />
                    ) : (
                      <FaEyeSlash
                        className="cursor-pointer"
                        onClick={toggleConfirmPasswordType}
                      />
                    )}
                  onChange={handleChange}
                  onPressEnter={handleSubmit}
                />
                <p className="mb-0">
                  {touched.passwordConfirmation && errors.passwordConfirmation && <small className="text-red-500">{errors.passwordConfirmation}</small>}
                </p>
              </div>
            </div>
          </Spin>

          <div className="flex flex-col items-center">
            <Button
              type="primary"
              className="primary-btn block my-6 w-full"
              disabled={processing}
              onClick={handleSubmit}
            >
              {
              processing
                ? <Spin indicator={isProcessing} />
                : 'Register'
            }
            </Button>

            <p className="text-xs">
              Already have an account?
              {' '}
              <Link
                to="/login"
                className="inline text-blue-700 underline hover:text-blue-500 hover:no-underline"
              >
                Login.
              </Link>
            </p>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default Register;

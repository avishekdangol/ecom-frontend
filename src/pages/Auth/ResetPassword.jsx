import { useEffect, useState } from 'react';
import {
  Input, Button, Spin,
} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { Formik, Form } from 'formik';
import { BiLock } from 'react-icons/bi';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import ResetPasswordSchema from './validations/ResetPasswordSchema';
import { showErrorNotification, showSuccessNotification } from '@/utils/Toasts';
import jwt from '@/auth/useJwt';

function ResetPassword() {
  const routeParams = new URLSearchParams(window.location.search);
  const redirect = routeParams.get('redirect');
  const email = decodeURIComponent(redirect.slice(redirect.indexOf('email=') + 6, redirect.length));
  const [token, setToken] = useState('');

  const [processing, setProcessing] = useState(false);
  const isProcessing = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  const [passwordType, setPasswordType] = useState('password');
  const [confirmPasswordType, setConfirmPasswordType] = useState('password');

  const togglePasswordType = () => {
    setPasswordType(passwordType === 'password' ? 'text' : 'password');
  };
  const toggleConfirmPasswordType = () => {
    setConfirmPasswordType(confirmPasswordType === 'password' ? 'text' : 'password');
  };
  const navigate = useNavigate();

  useEffect(() => {
    jwt.requestServer(redirect).then((response) => {
      setToken(response.data.token);
    });
  });

  return (
    <>
      <h4 className="mb-5 text-center">Reset Password</h4>
      <Formik
        initialValues={{
          password: '',
          passwordConfirmation: '',
        }}
        validationSchema={ResetPasswordSchema}
        onSubmit={(values) => {
          setProcessing(true);
          const params = {
            email,
            token,
            ...values,
          };
          jwt.resetPassword(params).then((response) => {
            showSuccessNotification('Success', response.data.message);
            navigate('/login');
          }).catch(({ response }) => {
            let message = '';
            if (response.data.message === 'passwords.token') message = 'Password reset link is expired';
            showErrorNotification('Reset Password Failed', message);
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
                id="password"
                name="password"
                type={passwordType}
                value={values.password}
                placeholder="New Password"
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

            <div className="mb-4">
              <Input
                id="passwordConfirmation"
                name="passwordConfirmation"
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

            <Button
              type="primary"
              className="primary-btn block my-6 w-full"
              disabled={processing}
              onClick={handleSubmit}
            >
              {
              processing
                ? <Spin indicator={isProcessing} />
                : 'Reset Password'
            }
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default ResetPassword;

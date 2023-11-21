import {
  Button, Card, Input, Spin,
} from 'antd';
import { Formik, Form } from 'formik';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { LoadingOutlined } from '@ant-design/icons';
import { BiLock } from 'react-icons/bi';
import { useState } from 'react';
import jwt from '@/auth/useJwt';
import ChangePasswordSchema from './validations/ChangePasswordSchema';
import showNotification from '@/utils/Toasts';

const isProcessing = <LoadingOutlined style={{ fontSize: 24 }} spin />;

function PasswordSetting() {
  const [passwordType, setPasswordType] = useState('password');
  const [oldPasswordType, setOldPasswordType] = useState('password');
  const [confirmPasswordType, setConfirmPasswordType] = useState('password');
  const [processing, setProcessing] = useState(false);

  const toggleOldPasswordType = () => {
    setOldPasswordType(oldPasswordType === 'password' ? 'text' : 'password');
  };
  const togglePasswordType = () => {
    setPasswordType(passwordType === 'password' ? 'text' : 'password');
  };
  const toggleConfirmPasswordType = () => {
    setConfirmPasswordType(confirmPasswordType === 'password' ? 'text' : 'password');
  };

  return (
    <Card>
      <h4 className="mb-5">Change Password</h4>

      <Formik
        initialValues={{
          oldPassword: '',
          password: '',
          passwordConfirmation: '',
        }}
        validationSchema={ChangePasswordSchema}
        onSubmit={(values, { resetForm }) => {
          setProcessing(true);
          jwt.changePassword(values).then((response) => {
            showNotification('success', 'Success!', response);
            resetForm();
          }).catch(({ response }) => {
            showNotification('error', 'Login Failed!', response);
          }).finally(() => {
            setProcessing(false);
          });
        }}
      >
        {({
          values, errors, touched, handleChange, handleSubmit,
        }) => (
          <Form className="w-[330px]">
            <Spin spinning={processing} indicator={isProcessing}>
              <div className="mx-2 mb-4">
                <Input
                  name="oldPassword"
                  type={oldPasswordType}
                  value={values.oldPassword}
                  placeholder="Old Password"
                  prefix={<BiLock />}
                  suffix={oldPasswordType === 'password'
                    ? (
                      <FaEye
                        className="cursor-pointer"
                        onClick={toggleOldPasswordType}
                      />
                    ) : (
                      <FaEyeSlash
                        className="cursor-pointer"
                        onClick={toggleOldPasswordType}
                      />
                    )}
                  onChange={handleChange}
                />
                <p className="mb-0">
                  {touched.oldPassword && errors.oldPassword && <small className="text-red-500">{errors.oldPassword}</small>}
                </p>
              </div>

              <div className="mx-2 mb-4">
                <Input
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

              <div className="mx-2 mb-4">
                <Input
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
            </Spin>

            <Button
              type="primary"
              className="primary-btn block my-6 mx-2 w-[180px]"
              disabled={processing}
              onClick={handleSubmit}
            >
              {
              processing
                ? <Spin indicator={isProcessing} />
                : 'Change Password'
            }
            </Button>
          </Form>
        )}
      </Formik>
    </Card>
  );
}

export default PasswordSetting;

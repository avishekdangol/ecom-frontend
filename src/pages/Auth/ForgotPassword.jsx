import { useState } from 'react';
import {
  Input, Button, Spin, Alert,
} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { Formik, Form } from 'formik';
import { BiUser, BiArrowBack } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import ForgotPasswordSchema from './validations/ForgotPasswordSchema';
import { showErrorNotification } from '@/utils/Toasts';
import jwt from '@/auth/useJwt';

function ForgotPassword() {
  const [processing, setProcessing] = useState(false);
  const [emailSentMessage, setEmailSentMessage] = useState('');
  const isProcessing = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  return (
    <div>
      {
        emailSentMessage
          ? (
            // Email Sent Message
            <div className="w-full">
              <Alert message={emailSentMessage} type="success" showIcon />
              <div className="text-center mt-5">
                <Link
                  to="/login"
                  className="text-xs text-blue-700 hover:text-blue-500"
                >
                  Go to Login
                </Link>
              </div>
            </div>
          ) : (
            // Forgot Password Form
            <div>
              <h4 className="mb-5 text-center">Forgot Password?</h4>
              <Formik
                initialValues={{ email: '' }}
                validationSchema={ForgotPasswordSchema}
                onSubmit={(values) => {
                  setProcessing(true);
                  const params = {
                    email: values.email,
                  };
                  jwt.forgotPassword(params).then((response) => {
                    setEmailSentMessage(response.data.message);
                  }).catch(({ response }) => {
                    showErrorNotification('Error', response.data.errors.email);
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

                    <Button
                      type="primary"
                      className="primary-btn block my-6 w-full"
                      disabled={processing}
                      onClick={handleSubmit}
                    >
                      {
                    processing
                      ? <Spin indicator={isProcessing} />
                      : 'Send Reset Password Link'
                  }
                    </Button>
                    <div className="w-full text-center">
                      <Link
                        to="/login"
                        className="text-xs text-blue-700 hover:text-blue-500"
                      >
                        <BiArrowBack className="inline" />
                        &nbsp;
                        Go Back
                      </Link>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          )
      }
    </div>
  );
}

export default ForgotPassword;

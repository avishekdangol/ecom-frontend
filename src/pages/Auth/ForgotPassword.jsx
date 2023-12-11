import { useState } from 'react';
import { Input, Alert } from 'antd';
import { Formik, Form } from 'formik';
import { BiUser, BiArrowBack } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import ForgotPasswordSchema from './validations/ForgotPasswordSchema';
import showNotification from '@/utils/Toasts';
import jwt from '@/auth/useJwt';
import ProcessingSpinButton from '@/components/reusables/ProcessingSpinButton';

function ForgotPassword() {
  const [processing, setProcessing] = useState(false);
  const [emailSentMessage, setEmailSentMessage] = useState('');

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
                    showNotification('error', response.data.errors.email);
                  });
                }}
              >
                {({
                  values, touched, errors, handleChange, handleSubmit,
                }) => (
                  <Form>
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

                    <ProcessingSpinButton
                      buttonClasses="primary-btn block my-6 w-full"
                      text="Send Reset Password Link"
                      processing={processing}
                      action={handleSubmit}
                    />

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

import { useState } from 'react';
import { Input, Button, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { Formik, Form } from 'formik';
import { BiUser, BiArrowBack } from 'react-icons/bi';
import ForgotPasswordSchema from './validations/ForgotPasswordSchema';
import jwt from '@/auth/useJwt';
import { Link } from 'react-router-dom';

function ForgotPassword() {
  const [processing, setProcessing] = useState(false);
  const isProcessing = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  return (
    <>
      <h4 className="mb-5 text-center">Forgot Password?</h4>
      {/* <p className="text-sm">Enter your details below to request password reset.</p> */}
      <Formik
        initialValues={{
          email: '',
          password: '',
          remember: false,
        }}
        validationSchema={ForgotPasswordSchema}
        onSubmit={(values) => {
          setProcessing(true);
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
    </>
  );
}

export default ForgotPassword;

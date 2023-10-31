import {
  Card, Form, Input, Row, Col, Button, DatePicker,
} from 'antd';
import { Formik } from 'formik';
import { useState } from 'react';
import getUserData from '@/utils/common.js';
import jwt from '@/auth/useJwt';
import ProfileSchema from './validations/ProfileSchema';
import { showSuccessNotification, showErrorNotification } from '@/utils/Toasts';

function Settings() {
  const user = getUserData();

  const [processing, setProcessing] = useState(false);

  return (
    <Card title="Profile Information">
      <Formik
        initialValues={user}
        validationSchema={ProfileSchema}
        onSubmit={(values) => {
          setProcessing(true);
          jwt.updateProfile(values).then((response) => {
            localStorage.removeItem('userData');
            localStorage.setItem('userData', JSON.stringify(values));
            showSuccessNotification('Success', response.data.message);
          }).catch(({ response }) => {
            showErrorNotification('Error!', response.data.message);
          }).finally(() => {
            setProcessing(false);
          });
        }}
      >
        {({
          values, touched, errors, handleChange, handleSubmit,
        }) => (
          <Form layout="vertical">
            <Row className="justify-between">
              <Col span={11}>
                <Form.Item label="First Name">
                  <Input
                    name="firstName"
                    placeholder="First Name"
                    defaultValue={values.firstName}
                    onChange={handleChange}
                  />
                  <p className="mb-0">
                    {touched.firstName && errors.firstName && <small className="text-red-500">{errors.firstName}</small>}
                  </p>
                </Form.Item>
              </Col>

              <Col span={11}>
                <Form.Item label="Last Name">
                  <Input
                    name="lastName"
                    placeholder="Last Name"
                    defaultValue={values.lastName}
                    onChange={handleChange}
                  />
                  <p className="mb-0">
                    {touched.lastName && errors.lastName && <small className="text-red-500">{errors.lastName}</small>}
                  </p>
                </Form.Item>
              </Col>
            </Row>

            <Row className="justify-between">
              <Col span={7}>
                <Form.Item label="Email">
                  <Input
                    name="email"
                    placeholder="Email"
                    defaultValue={values.email}
                    onChange={handleChange}
                  />
                  <p className="mb-0">
                    {touched.email && errors.email && <small className="text-red-500">{errors.email}</small>}
                  </p>
                </Form.Item>
              </Col>

              <Col span={7}>
                <Form.Item label="Phone">
                  <Input
                    name="phone"
                    placeholder="Phone"
                    defaultValue={values.phone}
                    onChange={handleChange}
                  />
                  <p className="mb-0">
                    {touched.phone && errors.phone && <small className="text-red-500">{errors.phone}</small>}
                  </p>
                </Form.Item>
              </Col>

              <Col span={7}>
                <Form.Item label="Date of Birth">
                  <DatePicker
                    name="dateOfBirth"
                    placeholder="Date of Birth"
                    defaultValue={values.dateOfBirth}
                    onChange={handleChange}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row className="justify-between">
              <Col span={7}>
                <Form.Item label="Street">
                  <Input
                    name="street"
                    placeholder="Street"
                    defaultValue={values.street}
                    onChange={handleChange}
                  />
                </Form.Item>
              </Col>

              <Col span={7}>
                <Form.Item label="City">
                  <Input
                    name="city"
                    placeholder="City"
                    defaultValue={values.city}
                    onChange={handleChange}
                  />
                </Form.Item>
              </Col>

              <Col span={7}>
                <Form.Item label="Postal Code">
                  <Input
                    name="postalCode"
                    placeholder="Postal Code"
                    defaultValue={values.postalCode}
                    onChange={handleChange}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row className="justify-between">
              <Col span={11}>
                <Form.Item label="State">
                  <Input
                    name="state"
                    placeholder="State"
                    defaultValue={values.state}
                    onChange={handleChange}
                  />
                </Form.Item>
              </Col>

              <Col span={11}>
                <Form.Item label="Country">
                  <Input
                    name="country"
                    placeholder="Country"
                    defaultValue={values.country}
                    onChange={handleChange}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Button
              className="primary-btn float-right"
              type="primary"
              disabled={processing}
              onClick={handleSubmit}
            >
              Update Profile
            </Button>
          </Form>
        )}
      </Formik>
    </Card>
  );
}

export default Settings;

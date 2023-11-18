import {
  Card, Form, Input, Row, Col, Button, DatePicker, Select,
} from 'antd';
import { Formik } from 'formik';
import { useState } from 'react';
import { effect, signal } from '@preact/signals-react';
import { getUserData } from '@/utils/common.js';
import jwt from '@/auth/useJwt';
import ProfileSchema from './validations/ProfileSchema';
import { showSuccessNotification, showErrorNotification } from '@/utils/Toasts';

const countries = signal([]);

const getCountries = () => {
  jwt.getCountries().then((response) => {
    countries.value = response.data.data.map(({ country, code }) => ({
      label: country,
      value: code,
    }));
  });
};

const filterOption = (input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

effect(() => {
  getCountries();
});

function Settings() {
  const user = getUserData.value;
  const [processing, setProcessing] = useState(false);

  return (
    <Card title="Profile Information">
      <Formik
        initialValues={{
          ...user,
          country: user.country?.code,
        }}
        validationSchema={ProfileSchema}
        onSubmit={(values) => {
          setProcessing(true);
          jwt.updateProfile(values).then((response) => {
            if (response.status === 200) {
              localStorage.removeItem('userData');
              localStorage.setItem('userData', JSON.stringify(response.data.data));
              showSuccessNotification('Success', response.data.message);
            }
          }).catch(({ response }) => {
            showErrorNotification('Error!', response.data.message);
          }).finally(() => {
            setProcessing(false);
          });
        }}
      >
        {({
          values, touched, errors, handleChange, handleSubmit, setFieldValue,
        }) => (
          <Form layout="vertical">
            <Row className="justify-between">
              <Col span={8}>
                Image
              </Col>
              <Col className="mr-5">
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

                <Row>
                  <Col span={7} className="mr-8">
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

                  <Col span={7} className="mr-8">
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
                        className="w-[230px]"
                        defaultValue={values.dateOfBirth}
                        onChange={handleChange}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row>
                  <Col span={7} className="mr-8">
                    <Form.Item label="Street">
                      <Input
                        name="street"
                        placeholder="Street"
                        defaultValue={values.street}
                        onChange={handleChange}
                      />
                    </Form.Item>
                  </Col>

                  <Col span={7} className="mr-8">
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
                        className="w-[230px]"
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
                      <Select
                        showSearch
                        name="country"
                        placeholder="Select a Country"
                        defaultValue={values.country}
                        options={countries.value}
                        filterOption={filterOption}
                        onChange={(value) => setFieldValue('country', value)}
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
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </Card>
  );
}

export default Settings;

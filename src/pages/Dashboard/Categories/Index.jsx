import React, { useState } from 'react';
import {
  Form, Table, Typography,
} from 'antd';
import { effect, signal } from '@preact/signals-react';
import jwt from '@/auth/useJwt';
import DashLayout from '@/layouts/DashLayout';
import EditableTableCell from '@/components/reusables/EditableTableCell';
import showNotification from '@/utils/Toasts';

const categories = signal([]);
const categoriesMeta = signal({});
const isLoading = signal(false);

const getCategories = () => {
  isLoading.value = true;
  jwt.getCategories().then((response) => {
    const { data, ...rest } = response.data.data;
    categories.value = data;
    categoriesMeta.value = rest;
    console.log(categoriesMeta.value)
  }).catch(({ response }) => {
    if (response) {
      const errors = Object.values(response.data.errors);
      showNotification('error', response.data.message, errors[0]);
    }
  }).finally(() => {
    isLoading.value = false;
  });
};

effect(() => getCategories());

function Categories() {
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');
  const isEditing = (record) => record.key === editingKey;
  const edit = (record) => {
    form.setFieldsValue({
      name: '',
      ...record,
    });
    setEditingKey(record.key);
  };
  const cancel = () => {
    setEditingKey('');
  };
  const deleteRecord = async (key) => {
    const newData = [...categories.value];
    const index = newData.findIndex((item) => key === item.key);
    newData.splice(index, 1);
    categories.value = newData;
    setEditingKey('');
  };
  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...categories.value];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        categories.value = newData;
        setEditingKey('');
      } else {
        newData.push(row);
        categories.value = newData;
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };
  const columns = [
    {
      title: 'name',
      dataIndex: 'name',
      width: '25%',
      editable: true,
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Typography.Link
              onClick={cancel}
            >
              <span className="text-danger">Cancel</span>
            </Typography.Link>
          </span>
        ) : (
          <>
            <Typography.Link
              disabled={editingKey !== ''}
              onClick={() => edit(record)}
            >
              Edit
            </Typography.Link>
            <Typography.Link
              disabled={editingKey !== ''}
              onClick={() => deleteRecord(record)}
              className="ml-2"
            >
              <span className="text-danger">Delete</span>
            </Typography.Link>
          </>
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <DashLayout>
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableTableCell,
            },
          }}
          bordered
          dataSource={categories.value}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={{
            onChange: cancel,
          }}
          rowKey="id"
        />
      </Form>
    </DashLayout>
  );
}
export default Categories;

import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Form, Table, Typography, Modal, Button,
} from 'antd';
import { ExclamationCircleFilled, WarningOutlined } from '@ant-design/icons';
import EditableTableCell from '@/components/reusables/EditableTableCell';
import showNotification from '@/utils/Toasts';
import jwt from '@/auth/useJwt';

const { confirm } = Modal;

function AntTable({
  title, data, addData, setData, columns, updateApi, deleteApi, bulkDeleteApi,
}) {
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');
  const isEditing = (record) => record.id === editingKey;
  // Edit
  const edit = (record) => {
    form.setFieldsValue({
      id: '',
      name: '',
      ...record,
    });
    setEditingKey(record.id);
  };
  // Cancel Edit
  const cancel = () => {
    setEditingKey('');
  };
  // Delete Record
  const deleteRecord = (id) => {
    const newData = [...data];
    const index = newData.findIndex((item) => id === item.id);
    newData.splice(index, 1);
    setData(newData);
    if (deleteApi) {
      jwt[deleteApi](id).then((response) => {
        showNotification('success', response);
      }).catch(({ response }) => {
        showNotification('error', response);
      });
    }
    setEditingKey('');
  };
  // Delete Confirmation
  const showDeleteConfirm = (record) => {
    confirm({
      title: `Are you sure you want to delete ${record.name}?`,
      icon: <WarningOutlined />,
      okType: 'danger',
      okText: 'Delete',
      onOk() { deleteRecord(record.id); },
    });
  };
  // Save Record
  const save = (id, row) => {
    try {
      const newData = [...data];
      const index = newData.findIndex((item) => id === item.id);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        if (updateApi) {
          const params = {
            id,
            ...row,
          };
          jwt[updateApi](id, params).then((response) => {
            showNotification('success', response);
          }).catch(({ response }) => {
            showNotification('error', response);
          });
        }
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };
  // Save Confirmation
  const showSaveConfirm = async (recordId) => {
    const row = await form.validateFields();
    confirm({
      title: 'Are you sure you want to save these changes?',
      icon: <ExclamationCircleFilled />,
      okText: 'Confirm',
      onOk() { save(recordId, row); },
    });
  };
  // Table Columns
  const tableColumns = [
    ...columns,
    {
      title: 'Operation',
      dataIndex: 'operation',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => showSaveConfirm(record.id)}
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
              onClick={() => showDeleteConfirm(record)}
              className="ml-2"
            >
              <span className="text-danger">Delete</span>
            </Typography.Link>
          </>
        );
      },
    },
  ];
  // Merged columns to allow inline editing
  const mergedColumns = tableColumns.map((col) => {
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
    <>
      <section className="p-4">
        <div className="flex justify-between items-center w-full">
          <h1>{title}</h1>
          <Button
            className="mr-2"
            onClick={addData}
          >
            {`Add ${title}`}
          </Button>
        </div>
      </section>
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableTableCell,
            },
          }}
          bordered
          dataSource={data}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={{
            onChange: cancel,
          }}
          rowKey="id"
        />
      </Form>
    </>
  );
}

AntTable.propTypes = {
  title: PropTypes.string,
  data: PropTypes.array.isRequired,
  addData: PropTypes.func,
  setData: PropTypes.func,
  columns: PropTypes.array.isRequired,
  updateApi: PropTypes.string,
  deleteApi: PropTypes.string,
  bulkDeleteApi: PropTypes.string,
};

AntTable.defaultProps = {
  title: null,
  addData: null,
  setData: null,
  updateApi: null,
  deleteApi: null,
  bulkDeleteApi: null,
};

export default AntTable;

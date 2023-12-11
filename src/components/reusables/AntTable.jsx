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
  title, data, addData, refetchData, columns, updateApi, deleteApi, bulkDeleteApi,
}) {
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');
  const [selectedRecords, setSelectedRecords] = useState([]);
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
    if (deleteApi) {
      jwt[deleteApi](id).then((response) => {
        showNotification('success', response);
        if (refetchData) refetchData();
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
      const index = data.findIndex((item) => id === item.id);

      if (index > -1) {
        if (updateApi) {
          const params = {
            id,
            ...row,
          };
          jwt[updateApi](id, params).then((response) => {
            showNotification('success', response);
            if (refetchData) refetchData();
          }).catch(({ response }) => {
            showNotification('error', response);
          });
        }
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
  // Multiple Row Selection
  const rowSelection = {
    onChange: (selectedRowKeys) => {
      setSelectedRecords(selectedRowKeys);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === 'Disabled User',
      // Column configuration not to be checked
      name: record.name,
    }),
  };
  // Bulk Delete
  const bulkDelete = () => {
    if (bulkDeleteApi) {
      jwt[bulkDeleteApi]({ ids: selectedRecords }).then((response) => {
        showNotification('success', response);
        const newData = [...data];
        selectedRecords.forEach((record) => {
          const index = newData.findIndex((item) => record === item.id);
          newData.splice(index, 1);
        });
      }).catch(({ response }) => {
        showNotification('error', response);
      });
    }
  };
  // Bulk Delete Modal
  const showBulkDeleteModal = () => {
    confirm({
      title: `Are you sure you want to delete these ${title.toLowerCase()}?`,
      icon: <WarningOutlined />,
      okType: 'danger',
      okText: 'Delete',
      onOk() { bulkDelete(); },
    });
  };

  return (
    <>
      <section className="p-4">
        <div className="flex justify-between items-center w-full">
          <h1>{title}</h1>
          <div className="flex">
            {
              selectedRecords.length > 0 && (
              <Button
                danger
                onClick={showBulkDeleteModal}
              >
                Bulk Delete
              </Button>
              )
            }
            <Button
              className="mx-2"
              onClick={addData}
            >
              {`Add ${title}`}
            </Button>
          </div>
        </div>
      </section>
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableTableCell,
            },
          }}
          rowKey="id"
          bordered
          dataSource={data}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={{
            onChange: cancel,
          }}
          rowSelection={{
            type: 'checkbox',
            ...rowSelection,
          }}
        />
      </Form>
    </>
  );
}

AntTable.propTypes = {
  title: PropTypes.string,
  data: PropTypes.array.isRequired,
  addData: PropTypes.func,
  refetchData: PropTypes.func,
  columns: PropTypes.array.isRequired,
  updateApi: PropTypes.string,
  deleteApi: PropTypes.string,
  bulkDeleteApi: PropTypes.string,
};

AntTable.defaultProps = {
  title: null,
  addData: null,
  refetchData: null,
  updateApi: null,
  deleteApi: null,
  bulkDeleteApi: null,
};

export default AntTable;

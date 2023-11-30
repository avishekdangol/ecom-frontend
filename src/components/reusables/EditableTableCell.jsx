import { Form, Input, InputNumber } from 'antd';
import PropTypes from 'prop-types';

function EditableTableCell({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  children,
  ...restProps
}) {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `The field ${title} is required!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
}

EditableTableCell.propTypes = {
  editing: PropTypes.bool,
  dataIndex: PropTypes.string,
  title: PropTypes.string,
  record: PropTypes.object,
  inputType: PropTypes.string,
  children: PropTypes.node.isRequired,
};

EditableTableCell.defaultProps = {
  editing: false,
  dataIndex: '',
  title: '',
  inputType: 'text',
  record: {},
};

export default EditableTableCell;

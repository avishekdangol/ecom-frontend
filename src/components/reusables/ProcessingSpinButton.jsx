import { LoadingOutlined } from '@ant-design/icons';
import { Button, Spin } from 'antd';
import PropTypes from 'prop-types';

function ProcessingSpinButton({
  size, type, buttonClasses, action, processing, text, onlySpinner,
}) {
  return (
    onlySpinner
      ? <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
      : (
        <Button
          size={size}
          type={type}
          className={buttonClasses}
          disabled={processing}
          onClick={action}
        >
          {
        processing
          ? <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
          : <span>{text}</span>
      }
        </Button>
      )
  );
}

ProcessingSpinButton.propTypes = {
  size: PropTypes.string,
  type: PropTypes.string,
  buttonClasses: PropTypes.string,
  action: PropTypes.func,
  processing: PropTypes.bool,
  text: PropTypes.string,
  onlySpinner: PropTypes.bool,
};

ProcessingSpinButton.defaultProps = {
  type: 'primary',
  buttonClasses: 'primary-btn',
  onlySpinner: false,
  size: 'default',
  action: null,
  processing: null,
  text: null,
};

export default ProcessingSpinButton;

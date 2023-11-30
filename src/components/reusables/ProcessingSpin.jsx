import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

function ProcessingSpin() {
  return (
    <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
  );
}

export default ProcessingSpin;

import {
  Row, Col, Card, Avatar,
} from 'antd';
import {
  FaUserAlt, FaMapMarkerAlt, FaEnvelope, FaPhoneAlt,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { getUserData } from '@/utils/common';
import AvatarUpload from './AvatarUpload';
import '@/scss/profile.scss';

function ProfileInfo() {
  const user = getUserData.value;

  return (
    <Card>
      <Row>
        <Col span={12} className="relative">
          <Avatar
            src={user.avatar}
            icon={<FaUserAlt />}
            shape="square"
            size={280}
            rootClassName="flex justify-center items-center"
          />
          <div className="absolute top-0 left-0 w-[280px] h-full">
            <AvatarUpload
              className="ant-upload-list-item-container"
            />
          </div>

        </Col>
        <Col span={12}>
          <h2 className="text-lg">{user.name}</h2>

          <div className="flex items-center">
            <FaMapMarkerAlt className="mr-1" />
            {
              user.address
                ? (<p>{user.address}</p>)
                : (
                  <Link to="/profile/settings">Update Address</Link>
                )
            }
          </div>

          <div className="flex items-center mt-4">
            <FaEnvelope className="mr-1" />
            <p>{user.email}</p>
          </div>
          <div className="flex items-center">
            <FaPhoneAlt className="mr-1" />
            <p>{user.phone}</p>
          </div>
        </Col>
      </Row>
    </Card>
  );
}

export default ProfileInfo;

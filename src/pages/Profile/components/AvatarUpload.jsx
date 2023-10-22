import { useState } from 'react';
import { Upload } from 'antd';
// eslint-disable-next-line import/no-extraneous-dependencies
import ImgCrop from 'antd-img-crop';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { showErrorNotification } from '@/utils/Toasts';

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

const beforeUpload = (file) => {
  const fileTypes = ['jpg', 'jpeg', 'png'];
  const isValidType = fileTypes.some((fileType) => file.includes(fileType));
  if (!isValidType) showErrorNotification('Error', 'You can only upload JPG/PNG file!');

  const isValidSize = file.size / 1024 / 1024 < 5;
  if (!isValidSize) showErrorNotification('Error', 'Image must smaller than 2MB!');
};

function AvatarUpload() {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();

  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const uploadButton = (
    <div>
      { loading ? <LoadingOutlined /> : <PlusOutlined />}
    </div>
  );

  return (
    <ImgCrop rotationSlider>
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader "
        maxCount={1}
        openFileDialogOnClick
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        { imageUrl ? (
          <img src={imageUrl} alt="Avatar" className="w-full" />
        ) : (
          uploadButton
        )}
      </Upload>
    </ImgCrop>
  );
}

export default AvatarUpload;

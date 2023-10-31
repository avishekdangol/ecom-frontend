// import { useState } from 'react';
// import { Upload } from 'antd';
// // eslint-disable-next-line import/no-extraneous-dependencies
// import ImgCrop from 'antd-img-crop';
// import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
// import PropTypes from 'prop-types';
// // import { showErrorNotification } from '@/utils/Toasts';

// function AvatarUpload({ avatar }) {
//   const [loading, setLoading] = useState(false);
//   const [imageUrl, setImageUrl] = useState();
//   const [fileList, setFileList] = useState([]);

//   const handleChange = ({ fileList: newFileList }) => {
//     setFileList(newFileList);
//   };

//   const uploadFile = ({ file, onSuccess, onError }) => {
//     setLoading(true);
//     console.log(imageUrl, file);
//   };

//   const onPreview = async (file) => {
//     let src = file.url;
//     if (!src) {
//       src = await new Promise((resolve) => {
//         const reader = new FileReader();
//         reader.readAsDataURL(file.originFileObj);
//         reader.onload = () => {
//           const url = reader.result;
//           setImageUrl(url);
//           resolve(url);
//         };
//       });
//     }
//     const image = new Image();
//     image.src = src;
//     const imgWindow = window.open(src);
//     imgWindow?.document.write(image.outerHTML);
//   };

//   const uploadButton = (
//     <div>
//       {loading ? <LoadingOutlined /> : <PlusOutlined />}
//       <div style={{ marginTop: 8 }}>Upload</div>
//     </div>
//   );

//   return (
//     <div className="h-full w-full">
//       {
//       avatar
//         ? (
//           <h2>Avatar</h2>
//         ) : (
//           <ImgCrop
//             modalOk="Upload"
//             rotationSlider
//             showGrid
//           >
//             <Upload
//               name="avatar"
//               customRequest={uploadFile}
//               listType="picture-card"
//               fileList={fileList}
//               className="avatar-uploader"
//               maxCount={1}
//               beforeUpload={() => false}
//               onPreview={onPreview}
//               onChange={handleChange}
//             >
//               {
//                 fileList.length === 0 && (uploadButton)
//               }
//             </Upload>
//           </ImgCrop>
//         )
//     }
//     </div>
//   );
// }

// AvatarUpload.propTypes = {
//   avatar: PropTypes.string,
// };

// AvatarUpload.defaultProps = {
//   avatar: null,
// };

// export default AvatarUpload;

import ImgCrop from 'antd-img-crop';
import React, { useState } from 'react';
import { Upload } from 'antd';

function AvatarUpload() {
  const [fileList, setFileList] = useState([]);

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  return (
    <ImgCrop rotationSlider>
      <Upload
        listType="picture-card"
        fileList={fileList}
        onChange={onChange}
        onPreview={onPreview}
        beforeUpload={() => false}
      >
        {fileList.length < 5 && '+ Upload'}
      </Upload>
    </ImgCrop>
  );
}
export default AvatarUpload;

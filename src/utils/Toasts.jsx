import { notification } from 'antd';

const getClasses = (type) => {
  switch (type) {
    case 'success':
      return 'bg-green-100 text-green-900';
    case 'error':
      return 'bg-red-100 text-red-900';
    default:
      return 'bg-gray-100 text-gray-900';
  }
};

export default function showNotification(type, response, title = null, message = null) {
  notification[type]({
    message: (<strong className={getClasses(type)}>{ title ?? `${type.charAt(0).toUpperCase()}${type.slice(1)}` }</strong>),
    description: (<span className={getClasses(type)}>{ response?.data?.message ?? message }</span>),
    placement: 'bottomLeft',
    className: getClasses(type),
    style: {
      fontFamily: 'Objective',
    },
  });
}

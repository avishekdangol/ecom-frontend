import { notification } from 'antd';

export default function showNotification(type, title, response, message = null) {
  notification[type]({
    message: title,
    description: response?.data?.message ?? message,
    placement: 'bottomLeft',
    style: {
      fontFamily: 'Objective',
      backgroundColor: 'rgb(220 252 231)',
    },
  });
}

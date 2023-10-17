import { notification } from 'antd';

export function showSuccessNotification(title, message) {
  notification.success({
    message: title,
    description: message,
    placement: 'bottomLeft',
    style: {
      fontFamily: 'Objective',
      backgroundColor: 'rgb(220 252 231)',
    },
  });
}

export function showErrorNotification(title, message) {
  notification.error({
    message: title,
    description: message,
    placement: 'bottomLeft',
    style: {
      fontFamily: 'Objective',
      backgroundColor: 'rgb(254 202 202)',
    },
  });
}

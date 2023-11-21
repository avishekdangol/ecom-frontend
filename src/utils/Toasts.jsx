import { notification } from 'antd';

export function showSuccessNotification(title, response, message = null) {
  notification.success({
    message: title,
    description: response?.data?.message ?? message,
    placement: 'bottomLeft',
    style: {
      fontFamily: 'Objective',
      backgroundColor: 'rgb(220 252 231)',
    },
  });
}

export function showErrorNotification(title, response, message = null) {
  notification.error({
    message: title,
    description: response?.data?.message ?? message,
    placement: 'bottomLeft',
    style: {
      fontFamily: 'Objective',
      backgroundColor: 'rgb(254 202 202)',
    },
  });
}

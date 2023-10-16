import { Card, Alert } from 'antd';
import { useEffect } from 'react';
import jwt from '@/auth/useJwt';
import { showErrorNotification } from '@/utils/Toasts';

function VerifyEmail() {
  const params = new URLSearchParams(window.location.search);
  const redirect = params.get('redirect');
  const verifyUrl = redirect.slice(redirect.indexOf('email'), redirect.length);

  useEffect(() => {
    jwt.verifyEmail(verifyUrl).then(() => {
      const userData = JSON.parse(localStorage.getItem('userData'));
      userData.emailVerifiedAt = new Date();
      localStorage.removeItem('userData');
      localStorage.setItem('userData', JSON.stringify(userData));
    }).catch((error) => {
      showErrorNotification('Error!', error.data.message);
    });
  }, []);

  return (
    <Card className="w-1/2 mt-[84px] mx-auto">
      <img className="logo cursor-pointer mx-auto mb-8" src="/assets/images/logo-color.png" width={150} alt="" />
      <Alert
        message="Verifying your email address. Please wait!"
        showIcon
      />
    </Card>
  );
}

export default VerifyEmail;

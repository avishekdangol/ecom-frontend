import { Card, Alert } from 'antd';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import jwt from '@/auth/useJwt';
import { showErrorNotification } from '@/utils/Toasts';

function VerifyEmail() {
  const params = new URLSearchParams(window.location.search);
  const redirect = params.get('redirect');
  const verifyUrl = redirect.slice(redirect.indexOf('email'), redirect.length);
  const navigate = useNavigate();

  useEffect(() => {
    jwt.requestServer(verifyUrl).then(() => {
      const userData = JSON.parse(localStorage.getItem('userData'));
      userData.emailVerifiedAt = new Date();
      localStorage.removeItem('userData');
      localStorage.setItem('userData', JSON.stringify(userData));

      const navigateHome = () => {
        navigate('/');
      };
      navigateHome();
    }).catch((error) => {
      showErrorNotification('Error', error.data?.message ?? 'Something went wrong!');
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

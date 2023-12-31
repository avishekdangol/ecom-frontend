import {
  Card, Alert, Button, Spin,
} from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { LoadingOutlined } from '@ant-design/icons';
import jwt from '@/auth/useJwt';
import { showSuccessNotification, showErrorNotification } from '@/utils/Toasts';

function VerifyEmail() {
  const params = new URLSearchParams(window.location.search);
  const redirect = params.get('redirect');
  const verifyUrl = redirect.slice(redirect.indexOf('email'), redirect.length);
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);
  const [linkExpired, setLinkExpired] = useState(false);
  const [tooManyAttempts, setTooManyAttempts] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const isProcessing = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  const navigateHome = () => {
    navigate('/');
  };

  // resend email verification link
  const resendVerificationLink = () => {
    setProcessing(true);
    jwt.resendEmailVerification().then((response) => {
      showSuccessNotification('Success', response.data.message);
      setEmailSent(true);
    }).finally(() => {
      setProcessing(false);
    });
  };

  // request server for email verification
  useEffect(() => {
    jwt.requestServer(verifyUrl).then(() => {
      const userData = JSON.parse(localStorage.getItem('userData'));
      userData.emailVerifiedAt = new Date();
      localStorage.removeItem('userData');
      localStorage.setItem('userData', JSON.stringify(userData));

      navigateHome();
    }).catch((error) => {
      switch (error.response.status) {
        case 403:
          showErrorNotification('Error', 'Link Expired');
          setLinkExpired(true);
          setTooManyAttempts(false);
          break;
        case 429:
          showErrorNotification('Error', error.response?.data?.message ?? 'Something went wrong');
          setTooManyAttempts(true);
          setLinkExpired(false);
          break;
        case 400:
          showErrorNotification('Error', error.response?.data?.message ?? 'Something went wrong');
          break;
        default:
          showErrorNotification('Error', error.response?.data?.message ?? 'Something went wrong');
      }
    });
  }, []);

  return (
    <Card className="w-1/2 mt-[84px] mx-auto">
      <img className="logo cursor-pointer mx-auto mb-8" src="/assets/images/logo-color.png" width={150} alt="" />
      {
        emailSent ? (
          <Alert
            message="An email has been sent to you for the verification."
            showIcon
            action={(
              <Button
                size="small"
                type="primary"
                className="w-[196px]"
                onClick={navigateHome}
              >
                Go back to Homepage
              </Button>
              )}
          />
        ) : (
          <div>
            {
              linkExpired && (
              <Alert
                message="Email Verification Failed"
                description="It seems the link has been expired."
                type="error"
                showIcon
                action={(
                  <Button
                    size="small"
                    type="primary"
                    className="w-[196px]"
                    onClick={resendVerificationLink}
                  >
                    { processing ? <Spin indicator={isProcessing} /> : 'Resend Verification Link' }
                  </Button>
                  )}
              />
              )
            }

            {
              tooManyAttempts && (
              <Alert
                message="Email Verification Failed"
                description="It seems the link has been expired and you're trying to verify your email with the expired link."
                type="error"
                showIcon
                action={(
                  <Button
                    size="small"
                    type="primary"
                    className="w-[196px]"
                    onClick={resendVerificationLink}
                  >
                    { processing ? <Spin indicator={isProcessing} /> : 'Resend Verification Link' }
                  </Button>
                    )}
              />
              )
            }
          </div>
        )
      }

      {
        !linkExpired && !tooManyAttempts && (
          <Alert
            message="Verifying your email address. Please wait!"
            showIcon
          />
        )
      }
    </Card>
  );
}

export default VerifyEmail;

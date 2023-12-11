import { Card, Alert, Button } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import jwt from '@/auth/useJwt';
import showNotification from '@/utils/Toasts';
import { decodeBase64, encodeBase64, setUserData } from '@/utils/common';
import ProcessingSpinButton from '@/components/reusables/ProcessingSpinButton';

function VerifyEmail() {
  const params = new URLSearchParams(window.location.search);
  const redirect = params.get('redirect');
  const verifyUrl = redirect.slice(redirect.indexOf('email'), redirect.length);
  const navigate = useNavigate();

  const [processing, setProcessing] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [errorDescription, setErrorDescription] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const navigateHome = () => {
    navigate('/');
  };

  // resend email verification link
  const resendVerificationLink = () => {
    setProcessing(true);
    jwt.resendEmailVerification().then((response) => {
      showNotification('success', response);
      setEmailSent(true);
    }).catch(({ response }) => {
      showNotification('error', response);
    }).finally(() => {
      setProcessing(false);
    });
  };

  // request server for email verification
  useEffect(() => {
    jwt.requestServer(verifyUrl).then(() => {
      const userData = JSON.parse(decodeBase64(localStorage.getItem('userData')));
      userData.emailVerifiedAt = new Date();
      localStorage.removeItem('userData');
      localStorage.setItem('userData', encodeBase64(JSON.stringify(userData)));
      setUserData(userData);

      navigateHome();
    }).catch(({ response }) => {
      setIsError(true);
      setErrorMessage('Email Verification Failed');
      switch (response.status) {
        case 403:
          showNotification('error', 'Link Expired');
          setErrorDescription('It seems like the link has been expired.');
          break;
        case 429:
          showNotification('error', response ?? null, null, 'Something went wrong');
          setErrorDescription('It seems like the link has been expired and you\'re trying to verify your email with the expired link.');
          break;
        case 400:
          showNotification('error', response ?? null, null, 'Something went wrong');
          setErrorDescription('It seems like you have already verified your email');
          break;
        default:
          showNotification('error', response ?? null, null, 'Something went wrong');
      }
    });
  }, []);

  return (
    <Card className="w-1/2 mt-[84px] mx-auto">
      <img className="logo cursor-pointer mx-auto mb-8" src="/assets/images/logo-color.png" width={150} alt="" />
      {
        emailSent && (
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
        )
      }

      {
        !emailSent && isError && (
        <Alert
          message={errorMessage}
          description={errorDescription}
          type="error"
          showIcon
          action={(
            <ProcessingSpinButton
              size="small"
              buttonClasses="w=[196px]"
              text="Resend Verification Link"
              processing={processing}
              action={resendVerificationLink}
            />
            )}
        />
        )
      }

      {
        !emailSent && !isError && (
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

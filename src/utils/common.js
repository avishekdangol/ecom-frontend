import { DecodeBase64 } from "./base64";

const getUserData = () => {
  const userData = JSON.parse(localStorage.getItem('userData'));
  if (userData) {
    return DecodeBase64(userData);
  }
  return null;
};

export default getUserData;

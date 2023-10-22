const getUserData = () => {
  const data = localStorage.getItem('userData');
  if (data) {
    const userData = JSON.parse(data);
    return {
      ...userData,
      name: `${userData.firstName} ${userData.lastName}`,
      address: userData.city && userData.country ? `${userData.city}, ${userData.country}` : null,
    };
  }
  return null;
};

export default getUserData;

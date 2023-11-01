import { effect, signal } from '@preact/signals-react';

export const getUserData = signal(null);

const mapUserData = (userData) => {
  getUserData.value = {
    ...userData,
    name: `${userData.firstName} ${userData.lastName}`,
    address: userData.city && userData.country ? `${userData.city}, ${userData.country.country}` : null,
  };
};

effect(() => {
  const data = localStorage.getItem('userData');
  if (data) {
    const userData = JSON.parse(data);
    mapUserData(userData);
  }
});

export const setUserData = (data) => {
  mapUserData(data);
};

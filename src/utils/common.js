import { effect, signal } from '@preact/signals-react';

export const encodeBase64 = (str) => encodeURIComponent(btoa(str));

export const decodeBase64 = (str) => atob(decodeURIComponent(str));

export const getUserData = signal(null);

const mapUserData = (userData) => {
  getUserData.value = {
    ...userData,
    name: `${userData.firstName} ${userData.lastName}`,
    address: userData.city && userData.country ? `${userData.city}, ${userData.country.country}` : null,
    role: userData.roles.map((role) => role.name)[0],
  };
};

effect(() => {
  const data = localStorage.getItem('userData');
  if (data) {
    const userData = JSON.parse(decodeBase64(data));
    mapUserData(userData);
  }
});

export const setUserData = (data) => {
  mapUserData(data);
};

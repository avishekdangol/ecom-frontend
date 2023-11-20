export const EncodeBase64 = (str) => encodeURIComponent(btoa(str));

export const DecodeBase64 = (str) => atob(decodeURIComponent(str));
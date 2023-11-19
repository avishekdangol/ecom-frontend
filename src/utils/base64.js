export const EncodeBase64 = (str) => {
    return encodeURIComponent(btoa(str))
}

export const DecodeBase64 = (str) => {
    return decodeURIComponent(atob(str))
}
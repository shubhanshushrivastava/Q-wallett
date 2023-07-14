var CryptoJS = require("crypto-js");
// const JWT = process.env.REACT_APP_JWTKEY;
// const JWT = "NOF-India-Backend";

export const encryptData = async (text , JWT) => {
  try {
    text = text.toString();
    let hashedPass = CryptoJS.AES.encrypt(text, JWT);
    hashedPass = hashedPass.toString();
    return hashedPass;
  } catch (error) {
    throw error;
  }
};

export const encryptDataPath = async (text , JWT) => {
  try {
    text = JSON.stringify(text);
    let hashedPass = CryptoJS.AES.encrypt(text, JWT);
    hashedPass = hashedPass.toString();
    return hashedPass;
  } catch (error) {
    throw error;
  }
};

export const decryptData = async (text , JWT) => {
  try {
    var bytes = CryptoJS.AES.decrypt(text, JWT);
    let data = bytes.toString(CryptoJS.enc.Utf8);
    return data;
  } catch (error) {
    throw error;
  }
};

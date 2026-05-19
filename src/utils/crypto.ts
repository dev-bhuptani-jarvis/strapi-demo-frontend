import CryptoJS from "crypto-js";

const SECRET_KEY =
  process.env.NEXT_PUBLIC_SECRET_KEY || "secret-key";

export const encryptData = (data: string) => {
  return CryptoJS.AES.encrypt(
    data,
    SECRET_KEY
  ).toString();
};

export const decryptData = (encryptedData: string) => {
  try {
    const bytes = CryptoJS.AES.decrypt(
      encryptedData,
      SECRET_KEY
    );

    const decryptedValue = bytes.toString(
      CryptoJS.enc.Utf8
    );

    return decryptedValue || null;
  } catch (error) {
    console.error("Unable to decrypt stored data.", error);
    return null;
  }
};

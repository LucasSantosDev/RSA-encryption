import { JSEncrypt } from "jsencrypt";

export const rsaEncrypt = (text: string, key: string) => {
  const encrypt = new JSEncrypt({
    default_key_size: "1024",
    default_public_exponent: "010001",
    log: false,
  });
  encrypt.setPublicKey(key);

  const encrypted = encrypt.encrypt(text);

  return encrypted;
};

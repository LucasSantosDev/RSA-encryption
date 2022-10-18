const express = require("express");
const NodeRSA = require("node-rsa");
const port = 3000;

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, PUT, GET");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

let dbSecretKey = "";

const resDecrypt = (text, key) => {
  const keyPrivate = new NodeRSA(key, { encryptionScheme: "pkcs1" });
  const decrypt = keyPrivate.decrypt(text, "utf8");

  return JSON.parse(decrypt);
};

const rsaKeys = () => {
  const keys = new NodeRSA({ b: 1024 });
  const publicKey = keys.exportKey("public");
  const privateKey = keys.exportKey("private");

  return {
    publicKey,
    privateKey,
  };
};

app.get("/keys", (req, res) => {
  const rsa = rsaKeys();
  dbSecretKey = rsa.privateKey;
  res.status(201).json({
    package: rsa.publicKey,
  });
});

app.put("/send", (req, res) => {
  const body = req.body;
  const decrypted = resDecrypt(body.data, dbSecretKey);

  console.log(body.data);
  console.log(decrypted);

  res.status(201).json({
    message: decrypted,
  });
});

app.listen(port, () => {
  console.log(`App on ${port}`);
});

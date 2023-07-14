const CryptoJS = require('crypto-js');


// Function to decrypt the encrypted seed phrase
const decryptSeedPhrase = (encryptedSeedPhrase, encryptionKey) => {
  const decryptedBytes = CryptoJS.AES.decrypt(encryptedSeedPhrase, encryptionKey);
  const decryptedSeedPhrase = decryptedBytes.toString(CryptoJS.enc.Utf8);
  return decryptedSeedPhrase;
};

module.exports ={decryptSeedPhrase}


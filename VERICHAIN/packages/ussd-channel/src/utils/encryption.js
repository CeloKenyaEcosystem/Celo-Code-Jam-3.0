const Crypto = require('crypto-js');
const { SALT } = require('../consts');

const encryptData = async (data, passcode) => {
  const saltedPasscode = await saltyPasscode(passcode)
  return Crypto.AES.encrypt(data, saltedPasscode).toString()
}

const decryptDataWpasscode = async (encryptedData, passcode) => {
  const saltedPasscode = await saltyPasscode(passcode)
  const bytes = Crypto.AES.decrypt(encryptedData.toString(), saltedPasscode)
  return bytes.toString(Crypto.enc.Utf8)
}

const decryptDataWtoken = async (encryptedData, token) => {
  const bytes = Crypto.AES.decrypt(encryptedData.toString(), token)
  return bytes.toString(Crypto.enc.Utf8)
}

const saltyPasscode = async (passcode) => {
  return Crypto.PBKDF2(passcode, SALT, { keySize: 8 }).toString()
}

module.exports = {
  encryptData, decryptDataWpasscode, decryptDataWtoken, saltyPasscode
}

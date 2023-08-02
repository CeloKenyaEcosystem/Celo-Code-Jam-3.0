const { encryptData } = require('../utils/encryption')
const { db } = require('../fbconfig')
const { menu } = require('../menu')

async function getDefaultNewWalletName() {
  const list = (await db.ref(menu.args.phoneNumber + '/wallets').once('value')).val()
  if(list === null){
    return "Wallet 1"
  }else{
    return `Wallet ${Object.values(list).length + 1}`
  }
}

async function encryptWallet(passcode, wallet) {
  const enPrivateKey = await encryptData(wallet.privateKey, passcode)
  const enMnemonic = await encryptData(wallet.mnemonic, passcode)
  const walletName = await getDefaultNewWalletName() 
  const newWallet = {
    walletName: walletName,
    address: wallet.address,
    enPrivateKey: enPrivateKey,
    enMnemonic: enMnemonic,
  }
  return newWallet
}

module.exports = { 
  encryptWallet
}
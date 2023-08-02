const { Wallet } = require('ethers')
const { generateWalletFromMnemonic } = require("../blockchain/blockchainHelper")
const { normalizeMnemonic } = require('../utils/mnemonic')
const logger = require('firebase-functions/logger');

// Used to temporarily hold keys for flows where
// Referenced from celo-web-wallet

let pendingWallet = null //{Wallet, isImported

async function setPendingWallet(mnemonic, isImported = true) {
  if (pendingWallet) {
    logger.warn('Overwriting existing pending account') //replace with degugging logger
  }
  const formattedMnemonic = normalizeMnemonic(mnemonic)
  const importedWallet = await generateWalletFromMnemonic(formattedMnemonic)
  pendingWallet = { importedWallet, isImported }
}

function setPendingWithWallet(isImported = false) {
  const wallet = Wallet
  if (pendingWallet) {
    logger.warn('Overwriting existing pending account')
  }
  pendingWallet = { wallet, isImported }
}

function getPendingWallet() {
  const pending = pendingWallet
  // Auto-clear it after first read
  pendingWallet = null
  return pending
}

module.exports = {
  setPendingWallet,
  setPendingWithWallet,
  getPendingWallet
}
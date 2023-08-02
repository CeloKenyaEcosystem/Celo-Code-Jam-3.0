/**
 * Utilities to facilitate sending transactions with
 * different gas currencies. Prefer these to
 * sending with Ethers directly.
 */

const { BigNumber } = require('ethers')
const { getProvider } = require('./provider')
const { getSigner } = require('./signer')
const { menu } = require('../menu')

async function sendTransaction(tx, feeEstimate) {
  const signedTx = await signTransaction(tx, feeEstimate)
  return sendSignedTransaction(signedTx)
}

async function signTransaction(tx, feeEstimate) {
  const signer = getSigner(menu.args.phoneNumber)
  if (!feeEstimate) {
    // For now, require fee to be pre-computed when using this utility
    // May revisit later
    throw new Error('Fee estimate required to send tx')
  }

  const signedTx = await signer.signTransaction({
    ...tx,
    // TODO: set gatewayFeeRecipient
    //feeCurrency: feeToken,
    //gasLimit: feeEstimate,
    //type: 2,
  })
  return signedTx
}

async function sendSignedTransaction(signedTx) {
  const provider = getProvider()
  const txResponse = await provider.sendTransaction(signedTx)
  const txReceipt = await txResponse.wait()
  return txReceipt
}

async function getCurrentNonce() {
  const signer = getSigner(menu.args.phoneNumber)
  const nonce = await signer.getTransactionCount('pending')
  return BigNumber.from(nonce).toNumber()
}

module.exports = {
  getCurrentNonce,
  sendSignedTransaction,
  signTransaction,
  sendTransaction,
}

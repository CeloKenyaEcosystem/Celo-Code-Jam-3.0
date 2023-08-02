const { isProviderSet } = require ('./provider')
const logger = require('firebase-functions/logger')

// Note this is the wallet's local signer, not to be confused with
// vote signers in the Accounts contract
let signer = {} //signers by userID

function isSignerSet(userId) {
  return !!signer[userId]
}

function getSigner(userId) {
  if (!signer[userId]) {
    logger.info('Signer is not yet initialized')
    throw new Error('Attempting to use signer before initialized')
  }
  return signer[userId]
}

function setSigner(_signer, userId) {
  if (!_signer) {
    throw new Error('Signer is invalid')
  }

  if (!isProviderSet()) {
    throw new Error('Provider must be set before signer')
  }

  if (signer[userId]) {
    logger.info('Signer is being overridden')
  }

  signer[userId] = _signer
  logger.info('Signer is set')
}

function clearSigner(userId) {
  signer[userId] = undefined
}

module.exports = {
  clearSigner, setSigner, getSigner, isSignerSet
}
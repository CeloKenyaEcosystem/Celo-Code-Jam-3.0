const { providers } = require('ethers')
const { config } = require('./configs')
const { STALE_BLOCK_TIME } = require('../consts')
const { promiseTimeout, sleep } = require('../utils/promises')
const { isStale } = require('../utils/time')
const logger = require('firebase-functions/logger');

let provider = undefined

function isProviderSet() {
  return !!provider
}

async function connectToProvider() {
  const { jsonRpcUrlPrimary, jsonRpcUrlSecondary } = config

  let connectionResult = await connectToJsonRpcProvider(jsonRpcUrlPrimary)

  if (!connectionResult && jsonRpcUrlSecondary) {
    connectionResult = await connectToJsonRpcProvider(jsonRpcUrlSecondary)
  }

  if (!connectionResult) {
    throw new Error('All json rpc providers failed to connect')
  }
}

async function connectToJsonRpcProvider(url) {
  try {
    logger.info(`Connecting to json rpc provider: ${url}`)
    provider = new providers.JsonRpcProvider(url)
    for (let i = 0; i < 3; i++) {
      const blockAndNetworkP = Promise.all([provider.getBlock('latest'), provider.getNetwork()])
      const blockAndNetwork = await promiseTimeout(blockAndNetworkP, 1000)
      if (blockAndNetwork && isProviderSynced(blockAndNetwork[0], blockAndNetwork[1])) {
        logger.info('Provider is connected')
        return true
      }
      // Otherwise wait a bit and then try again
      await sleep(1000)
    }
    throw new Error('Unable to sync after 3 attempts')
  } catch (error) {
    logger.info(`Failed to connect to json rpc provider: ${url}`, error)
    clearProvider()
    return false
  }
}

function isProviderSynced(block, network) {
  return (
    block &&
    block.number &&
    block.timestamp &&
    !isStale(block.timestamp * 1000, STALE_BLOCK_TIME * 6) &&
    network &&
    network.chainId === config.chainId
  )
}

function getProvider() {
  if (!provider) {
    logger.info('Provider is not yet initialized')
    throw new Error('Attempting to use provider before initialized')
  }
  return provider
}

function clearProvider() {
  provider = undefined
}

module.exports = {
  getProvider,
  clearProvider,
  connectToProvider,
  isProviderSet
}
const { config } = require('../blockchain/configs')

const CELO = {
  symbol: 'CELO',
  name: 'CELO Token',
  address: config.contractAddresses.CeloToken,
  decimals: 18,
  chainId: config.chainId,
  sortOrder: 10,
}
const cUSD = {
  symbol: 'cUSD',
  name: 'Celo Dollar',
  address: config.contractAddresses.StableToken,
  decimals: 18,
  chainId: config.chainId,
  //exchangeAddress: config.contractAddresses.Exchange,
  sortOrder: 20,
}

const NativeTokens = [CELO, cUSD]
const StableTokens = [cUSD]

const NativeTokensByAddress = {
  [CELO.address]: CELO,
  [cUSD.address]: cUSD,
}

module.exports = {
  CELO,
  cUSD,
  NativeTokens,
  NativeTokensByAddress,
  StableTokens,
}

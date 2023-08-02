const deployed = require('../blockchain/Abis/Jsons/deployed.json')

const configAlfajores = {
  jsonRpcUrlPrimary: 'https://alfajores-forno.celo-testnet.org',
  blockscoutUrl: 'https://explorer.celo.org/alfajores',
  apiBlockscountEndpoint: 'https://apothem.blocksscan.io/api/',
  name: 'alfajores',
  chainId: 44787,
  contractAddresses: {
    StableToken: '0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1', //cUSD
    CeloToken: '0xF194afDf50B03e69Bd7D057c1Aa9e10c9954E4C9', //Not the actual address
    VeriChain: deployed[44787][0].contracts.SupplyChainTracking.address, //deployed[chainId][0].contracts.[ContractName].address,
  },
}

exports.config = Object.freeze(configAlfajores)

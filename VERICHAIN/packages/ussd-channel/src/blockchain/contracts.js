const { Contract, utils } = require('ethers')
const { Erc20Abi } = require('./Abis/erc20')
const { Erc721Abi } = require('./Abis/erc721')
const { CeloTokenAbi } = require('./Abis/celoToken')
const { StableTokenAbi } = require('./Abis/stableToken')
const  VeriChainAbi  = require('./Abis/Jsons/SupplyChainTracking.json')  
const { getSigner } = require('./signer')
const { config } = require('./configs')
const { areAddressesEqual, normalizeAddress } = require('../utils/addresses')
const { menu } = require('../menu')
const logger = require('firebase-functions/logger')

//!TODO: Find best way to handle signers.
let contractCache = {}
let tokenContractCache = {} // token address to contract

const veriChainIface = new utils.Interface(VeriChainAbi)

function getContract(c) {
  const cachedContract = contractCache[c + menu.args.phoneNumber]
  if (cachedContract) return cachedContract
  const signer = getSigner(menu.args.phoneNumber)
  const address = config.contractAddresses[c]
  const abi = getContractAbi(c)
  const contract = new Contract(address, abi, signer)
  contractCache[c + menu.args.phoneNumber] = contract
  return contract
}

function getCustomContract(cc, addr) {
  const cachedContract = contractCache[addr + menu.args.phoneNumber]
  if (cachedContract) return cachedContract
  const signer = getSigner(menu.args.phoneNumber)
  const address = addr
  const abi = getContractAbi(cc)
  const contract = new Contract(address, abi, signer)
  contractCache[addr + menu.args.phoneNumber] = contract
  return contract
}

function getErc20Contract(tokenAddress) {
  return getTokenContract(tokenAddress, Erc20Abi)
}

function getErc721Contract(tokenAddress) {
  return getTokenContract(tokenAddress, Erc721Abi)
}

// Search for token contract by address
function getTokenContract(tokenAddress, abi) {
  const normalizedAddr = normalizeAddress(tokenAddress)
  const cachedContract = tokenContractCache[normalizedAddr + menu.args.phoneNumber]
  if (cachedContract) return cachedContract
  const signer = getSigner(menu.args.phoneNumber)
  const contract = new Contract(normalizedAddr, abi, signer)
  tokenContractCache[normalizedAddr + menu.args.phoneNumber] = contract
  return contract
}

function getContractAbi(c) {
  switch (c) {
    case 'CeloToken':
      return CeloTokenAbi
    case 'StableToken':
      return StableTokenAbi
    case 'VeriChain':
      return VeriChainAbi
    default:
      throw new Error(`No ABI for contract ${c}`)
  }
}

// Search for core contract by address
function getContractByAddress(address) {
  const name = getContractName(address)
  if (name) return getContract(name)
  else return null
}

// Search for core contract name by address
function getContractName(address) {
  if (!address) return null
  const contractNames = Object.keys(config.contractAddresses) // Object.keys loses types
  for (const name of contractNames) {
    const cAddress = config.contractAddresses[name]
    if (areAddressesEqual(address, cAddress)) {
      return name
    }
  }
  return null
}

let erc721Interface

// Normally, interfaces are retrieved through the getContract() function
// but ERC721 is an exception because no core celo contracts use it
function getErc721AbiInterface() {
  if (!erc721Interface) {
    erc721Interface = new utils.Interface(Erc721Abi)
  }
  return erc721Interface
}

// Necessary if the signer changes, as in after a logout
function clearContractCache() {
  contractCache = {}
  tokenContractCache = {}
}

module.exports = {
  clearContractCache,
  getErc721AbiInterface,
  getContractName,
  getContractByAddress,
  getErc721Contract,
  getErc20Contract,
  getCustomContract,
  getTokenContract,
  getContract,
  getContractAbi,
  veriChainIface,
}

const { utils } = require('ethers')
const { config } = require('../blockchain/configs')
const { db } = require('../fbconfig')
//const { menu } = require('../menu')
const { veriChainIface } = require('../blockchain/contracts')
const { smartContractCall } = require('../blockchain/blockchainHelper')

//shipment functions
async function createThisShipment(recPhoneNo, distance) {
  //Retrive receiver address by phone number
  const recAddress = "0x61979179B0EFcad139Bf6AcAA32Ba7aF50e41BA1"
  //Set price by phone number
  let assumedAmount = "0.00003"
  const price = utils.parseUnits((assumedAmount * 1).toFixed(2), 18).toString()
  //Set pickup time
  const pickupTime = Math.floor(Date.now() / 1000) + 86400
  try {
    const txReceipt = await smartContractCall('VeriChain', {
    method: 'createShipment',
    methodType: 'write',
    params: [recAddress, pickupTime, distance, price ]
  })

  return handleShipmentCreation(txReceipt)
} catch (error) {
    throw error
}
}

async function getShipmentDetails(senderPhoneNo, shipmentId) {
  const phoneNo = "+254" + senderPhoneNo.substring(1)
  sender = (await db.ref(phoneNo + '/activeWallet').once('value')).val()
  try {
    const shipmentDetails = await smartContractCall('VeriChain', {
      method: 'getShipment',
      methodType: 'read',
      params: [sender.address, shipmentId]
    })
    return shipmentDetails
  } catch (error) {
    throw error
  }
}

// handling transactions
const handleShipmentCreation =  (txReceipt) => {
  const { data, topics } = txReceipt.logs.find(
    (el) => el.address === config.contractAddresses.VeriChain,
  )
  const results = veriChainIface.parseLog({ data, topics })
  console.log(results)
  return "Success"
}

module.exports = {
  createThisShipment,
  getShipmentDetails
}

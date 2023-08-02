const { menu } = require('../menu')
const { db } = require('../fbconfig')
const logger = require('firebase-functions/logger')
const { createThisShipment, getShipmentDetails } = require('./shipment')



//@dev pickup time and pricing will be set automatically based on distance. 
// default will +24hrs of shipment creation and price of 3cUSD/Ks 300
menu.state('setRecPhoneNo', {
  run: () => {
    menu.session.set('details', ' ')
    menu.con('Enter Receiver Phone Number:')
  },
  next: {
    '*\\d+': 'setDistance',
  },
})

menu.state('setDistance', {
  run: () => {
    let recPhoneNo = menu.val;
    menu.session.set('details', recPhoneNo)
    menu.con('Enter Shipment Distance:') //Change to towns 
  },
  next: {
    '*\\d+': 'confirmDetails',
  },
})

menu.state('confirmDetails', {
  run: async () => {
    const distance = menu.val;
    const recPhoneNo = await menu.session.get('details');
    menu.session.set('details', recPhoneNo +" "+ distance)
    menu.con("Your Details:" + 
            "\nReceiver: " + recPhoneNo + 
            "\nDistance: " + distance +"km" +
            "\n1. Continue" +
            "\n2. Edit");
  },
  next: {
    1: 'createShipment',
    2: "setRecPhoneNo",
  },
})

menu.state("createShipment", {
  run: async () => {
    const details = await menu.session.get('details')
    const thisDetails = details.split(" ")
    //menu.end('Shipment Created Successfully!')
    const results = await createThisShipment(details[0], details[1])
    if (results) {
      menu.end('Shipment Created Successfully!')
    } else {
      menu.end('Transaction Failed!')
    }
  },
})

menu.state('checkShipment', {
  run: async () => {
    menu.session.set('shipDetails', ' ')
    menu.con('Enter Senders Phone:')
  },
    next: {
    '*\\d+': 'enterShipmentId',
  },
})

menu.state('enterShipmentId', {
  run: async () => {
    const senderPhoneNo = menu.val;
    menu.session.set('shipDetails', senderPhoneNo)
    menu.con('Enter Shipment ID:')
  },
  next: {
    '*\\d+': 'getShipmentDetails',
}
})

menu.state('getShipmentDetails', {
  run: async () => {
    const shipmentId = menu.val;
    const senderPhoneNo = await menu.session.get('shipDetails');
    const shipmentDetails = await getShipmentDetails(senderPhoneNo, shipmentId)
    menu.end("Shipment Details:" + shipmentDetails.toString())
  }
})

module.exports = {
  shipmentMenuStates: menu.states,
}
const express = require('express');
const functions = require('firebase-functions');
const { menu } = require('./menu');

const { setSigner, isSignerSet } = require('./blockchain/signer')
const { Wallet } = require('ethers')
const { NativeTokensByAddress } = require('./wallet/tokens')
const { getBalances } = require('./blockchain/blockchainHelper')


const app = express();
app.use(express.json());
app.use(express.urlencoded());

//Connect Provider
const { connectToProvider, isProviderSet, getProvider } = require('./blockchain/provider')
async function connectProvider() {
  await connectToProvider()
}
if (!isProviderSet()) {
  connectProvider()
}


//Add states to menu
const { obMenuStates } = require('./essentials/onboarding');
const { accMenuStates } = require('./essentials/account');
const { walMenuStates } = require('./wallet/index')
const { shipmentMenuStates } = require('./verichain/index')

menu.states = {
  ...menu.states,
  ...obMenuStates,
  ...accMenuStates,
  ...walMenuStates,
  ...shipmentMenuStates,
}

///console.log("This menu: ", menu.states)

menu.state('testfn', {
  run: async () => {
    if (isProviderSet()) {
      const provider = getProvider()
      const address = '0x8E912eE99bfaECAe8364Ba6604612FfDfE46afd2'
      const privateKey = '0x20a67adf6750c75ead6e91a6df269a250d301123723d743a8d65c3a57a7b1fa7'
      //const wallet = Wallet.fromMnemonic(mnemonic, CELO_DERIVATION_PATH)
      const wallet = new Wallet(privateKey, provider)
      let balances = {}
      setSigner(wallet)
      if (isSignerSet()) {
        balances = await getBalances(address, NativeTokensByAddress)
        functions.logger.info(balances)
      }
      const values = Object.values(balances).toString()
      menu.end('Provider Connected' + values)
    } else {
      menu.end('Provider Not connected')
    }
  },
})

app.post('/ussd', (req, res) => {
  // Read the variables sent via POST from our API
  let args = {
    phoneNumber: req.body.phoneNumber,
    sessionId: req.body.sessionId,
    serviceCode: req.body.serviceCode,
    //Operator: req.body.networkCode || req.body.Operator,
    text: req.body.text,
  }
  menu.run(args, (response) => {
    res.send(response)
  })
})

//exports.menu
exports.verichainussd = functions.https.onRequest(app)
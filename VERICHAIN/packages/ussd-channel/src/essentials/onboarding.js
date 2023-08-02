const { encryptWallet } = require('../wallet/walletManager')
const { createWallet, generateWalletFromMnemonic } = require('../blockchain/blockchainHelper')
const { saltyPasscode } = require('../utils/encryption')
const { setPendingWallet, getPendingWallet } = require("../wallet/pendingWallet")
const { menu } = require('../menu')
const { db } = require('../fbconfig')

let pincode = "";

menu.state('importation', {
  run: () => {
    menu.con("Enter your seed phrase, 8 words at a time!" + "\n First 8?");
  },
  next: {
    '*\\w+\\ +\\w+\\ +\\w+\\ +\\w+\\ +\\w+\\ +\\w+\\ +\\w+\\ +\\w+': 'nextEight'
  }
})

menu.state('nextEight', {
  run: () => {
    if (menu.val.split(' ').length == 8){
      let mnemonic = menu.val;
      menu.session.set('mnemonic', mnemonic)
      menu.con("Your seedphrase:" + "\n" + mnemonic + "\n Next 8?");
    }else {
      menu.con("You entered less words" + "\n Re-enter Next 8?");
    }
  },
  next: {
    '*\\w+\\ +\\w+\\ +\\w+\\ +\\w+\\ +\\w+\\ +\\w+\\ +\\w+\\ +\\w+': 'lastEight'
  }
})

menu.state('lastEight', {
  run: () => {
    if (menu.val.split(' ').length == 8){
      menu.session.get('mnemonic').then((mnemonic) => {
        let newMnemonic = mnemonic +" "+ menu.val;
        menu.session.set('mnemonic', newMnemonic)
        menu.con("Your seedphrase:" + "\n" + newMnemonic + "\n Last 8?");
      })
    }else{
      menu.con("You entered less words" + "\n Re-enter Last 8?");
    }
    
  },
  next: {
    '*\\w+\\ +\\w+\\ +\\w+\\ +\\w+\\ +\\w+\\ +\\w+\\ +\\w+\\ +\\w+': 'displayMnemonic'
  }
})

menu.state('displayMnemonic', {
  run: () => {
    menu.session.get('mnemonic').then( async (mnemonic) => {
        let newMnemonic = mnemonic +" "+ menu.val;
        menu.session.set('mnemonic', newMnemonic)
        await setPendingWallet(newMnemonic)
        menu.con("Your seedphrase:" + 
            "\n" + newMnemonic + 
            "\n1. Continue" + 
            "\n2. Re-enter phrase");
      })
  },
  next: {
    '1': 'registration',
    '2': 'importation'
  }
})

menu.state('registration', {
  run: () => {
    menu.con("Enter your name (first and last name):");
  },
  next: {
    '*\\w+\\ +\\w+': 'setPasscode'
  }
})

menu.state('setPasscode', {
  run: () => {
    //Store name and number to db
    const name = menu.val.split(' ')
    db.ref(menu.args.phoneNumber).child("userDetails").set({
      name: menu.val,
      phoneNo: menu.args.phoneNumber,
    }).then(()=>{
      menu.con(name[0] + " please enter a 6 (six) digit pin code:");
    })
    
  },
  next: {
    '*\\d+': 'confirmPasscode'
  }
})

menu.state('confirmPasscode', {
  run: () => {
    pincode = menu.val
    menu.con("Re-enter code to confirm:");
  },
  next: {
    '*\\d+': () => {
      if(menu.val === pincode){
        //Create a user token
        saltyPasscode(menu.val).then((token) => {
          db.ref(menu.args.phoneNumber).child("userDetails").child("userToken").set(token)
        })
        return 'createWallet';
      }else
        return 'confirmPasscode';
  }}
})

menu.state('createWallet', {
  run: async () => {
    const mnemonic = await menu.session.get('mnemonic');
    if(mnemonic.split(' ').length == 24){
      //const wallet = await generateWalletFromMnemonic(mnemonic)
      const activeWallet = (await db.ref(menu.args.phoneNumber + '/activeWallet').once('value')).val()
      const { importedWallet } = getPendingWallet()
      const encyrptedWallet = await encryptWallet(pincode, importedWallet)
      db.ref(menu.args.phoneNumber).child("wallets").push(encyrptedWallet).then(() => {
        if(activeWallet === null){
          db.ref(menu.args.phoneNumber).child("activeWallet").set(
            encyrptedWallet
          )
        }
        menu.con("Account imported successfully!" + "\n0. Home")
      })
    }else{
      const wallet = await createWallet()
      const activeWallet = (await db.ref(menu.args.phoneNumber + '/activeWallet').once('value')).val()
      const encyrptedWallet = await encryptWallet(pincode, wallet)
      db.ref(menu.args.phoneNumber).child("wallets").push(encyrptedWallet).then(() => {
        if(activeWallet === null){
          db.ref(menu.args.phoneNumber).child("activeWallet").set(
            encyrptedWallet
          )
        }
        menu.con("Account created successfully!" + "\n0. Home")
      })
    }
  },
  next: {
    "0": 'userMenu'
  }
})

module.exports = {
  obMenuStates: menu.states
}
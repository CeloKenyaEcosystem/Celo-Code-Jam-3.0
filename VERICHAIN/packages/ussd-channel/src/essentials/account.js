const { menu } = require('../menu')
const { db } = require('../fbconfig')
const { shortenAddress } = require('../utils/addresses')

menu.state('myAccount', {
  run: () => {
    db.ref(menu.args.phoneNumber + '/userDetails').once('value', (userDetails) => {
      const name = userDetails.val().name.split(' ')
      menu.con(
        name[0] +
          '. Choose option:' +
          '\n1. Balance' +
          '\n2. Wallets' +
          '\n3. Add wallet' +
          '\n4. Change PIN' +
          '\n5. Invite a Friend' +
          '\n0. Back',
      )
    })
  },
  next: {
    0: 'userMenu',
    1: 'getBalance',
    2: 'myWallets',
  },
})

menu.state('myWallets', {
  run: () => {
    db.ref(menu.args.phoneNumber + '/wallets').once('value', (wallets) => {
      let walletList = []
      menu.session.set('wallets', Object.values(wallets.val()))
      Object.values(wallets.val()).forEach(
        (wallet, i) =>
          (walletList = [
            ...walletList,
            i +
              1 +
              '. ' +
              wallet.walletName.charAt(0).toUpperCase() +
              wallet.walletName.slice(1) +
              ' (' +
              shortenAddress(wallet.address, true) +
              ')',
          ]),
      )
      menu.con('My wallets \n' + walletList.join('\n') + '\n0. Back 00. Home')
    })
  },
  next: {
    '*[1-9]+': 'walletDetails',
    0: 'myAccount',
    '00': 'userMenu',
  },
})

menu.state('walletDetails', {
  run: () => {
    menu.session.get('wallets').then((wallets) => {
      menu.session.set('thisWallet', wallets[menu.val - 1])
      menu.con(
        'Wallet ' +
          menu.val +
          ' Details:' +
          '\n1. address' +
          '\n2. Seed Phrase' +
          '\n3. Private Key' +
          '\n0. Back 00. Home',
      )
    })
  },
  next: {
    1: 'address',
    0: 'myWallets',
    '00': 'userMenu',
  },
})

menu.state('address', {
  run: () => {
    menu.session.get('thisWallet').then((wallet) => {
      menu.con('Address:\n' + wallet.address + '\n0. Back 00. Home')
    })
  },
  next: {
    0: 'walletDetails',
    '00': 'userMenu',
  },
})

module.exports = {
  accMenuStates: menu.states,
}

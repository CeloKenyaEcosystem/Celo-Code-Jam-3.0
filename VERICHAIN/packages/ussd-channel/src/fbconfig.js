const admin = require('firebase-admin')

var serviceAccount = require("./veri-chain-firebase-adminsdk.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://veri-chain-default-rtdb.europe-west1.firebasedatabase.app/"
});

let db = admin.database();

module.exports = {
  db
}

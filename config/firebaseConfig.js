const admin = require('firebase-admin');
const serviceAccount = require('./firebaseConfig.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:'https://compact-marker-428905-f6-default-rtdb.firebaseio.com/'
});

module.exports = admin;

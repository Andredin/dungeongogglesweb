const admin = require('firebase-admin');
const fs = require('fs');

if(!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    throw "missing GOOGLE_APPLICATION_CREDENTIALS env var";
}
if(!fs.existsSync(process.env.GOOGLE_APPLICATION_CREDENTIALS)) {
    throw "GOOGLE_APPLICATION_CREDENTIALS env var is not a valid path";
}

const serviceAccount = require(process.env.GOOGLE_APPLICATION_CREDENTIALS); 

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://dungeon-goggles.firebaseio.com'
});

module.exports = admin.firestore();
const admin = require('firebase-admin');
const fs = require('fs');

if(!process.env.SERVER_APPLICATION_CREDENTIALS) {
    throw "missing SERVER_APPLICATION_CREDENTIALS env var";
}
if(!fs.existsSync(process.env.SERVER_APPLICATION_CREDENTIALS)) {
    throw "SERVER_APPLICATION_CREDENTIALS env var is not a valid path";
}

const firebaseCredentials = Object.freeze(require(process.env.SERVER_APPLICATION_CREDENTIALS)); 

admin.initializeApp({
    credential: admin.credential.cert(firebaseCredentials)
});

module.exports = admin.firestore();
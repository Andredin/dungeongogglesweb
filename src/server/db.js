const admin = require('firebase-admin');

if(!process.env.SERVER_APPLICATION_CREDENTIALS) {
    throw "missing SERVER_APPLICATION_CREDENTIALS env var";
}

const jsonString = Buffer.from(process.env.SERVER_APPLICATION_CREDENTIALS, 'base64').toString();
const firebaseCredentials = Object.freeze(JSON.parse(jsonString)); 

admin.initializeApp({
    credential: admin.credential.cert(firebaseCredentials)
});

module.exports = admin.firestore();
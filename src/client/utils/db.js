import 'firebase/firestore';

import firebase from 'firebase/app';

if(!FIREBASE_CONFIG) throw "Credentials not defined";
firebase.initializeApp(FIREBASE_CONFIG);
const db = firebase.firestore();

const subscribeToDmMap = (dmId, cb) => {
    if(!dmId) throw "Missing dm map id";

    const maps = db.collection("maps");

    const query = maps.where('dmId', '==', dmId);

    query.onSnapshot(snapshot => {
        if(snapshot.empty) {
            cb("Map not found");
            return;
        }
        const data = snapshot.docs[0].data();
        console.log(data);
        cb(null, data);
    });
}

const saveMap = (map) => {
    if(!map) throw "Missing dm map";

    
}


export default {
    subscribeToDmMap
}
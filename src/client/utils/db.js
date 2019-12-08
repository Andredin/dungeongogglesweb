import 'firebase/firestore';

import firebase from 'firebase/app';

if(!FIREBASE_CONFIG) throw "Credentials not defined";
firebase.initializeApp(FIREBASE_CONFIG);
const db = firebase.firestore();

const subscribeToDmMap = (dmId, cb) => {
    if(!dmId) throw "Missing dm map id";

    db.collection("maps").doc("map-" + dmId).onSnapshot(snapshot => {
        snapshot.exists ? cb(null, snapshot.data()) : cb("Map not found");
    });
}

const saveMap = (map) => {
    if(!map) throw "Missing dm map";

    
}


export default {
    subscribeToDmMap
}
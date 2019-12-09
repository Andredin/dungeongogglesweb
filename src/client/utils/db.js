import 'firebase/firestore';

import firebase from 'firebase/app';

if(!FIREBASE_CONFIG) throw 'Credentials not defined';
firebase.initializeApp(FIREBASE_CONFIG);
const db = firebase.firestore();

const subscribeToDmMap = (dmId, cb) => {
    if(!dmId) throw 'Missing dm map id';

    return db.collection('maps').doc('map-' + dmId).onSnapshot(snapshot => {
        snapshot.exists ? cb(null, snapshot.data()) : cb('Map not found');
    });
}

const subscribeToPlayerMap = async (playerId, cb) => {
    if(!playerId) throw 'Missing player map id';

    const res = await fetch(`/api/getDmId/${playerId}`);
    const { dmId } = await res.json();
    
    subscribeToDmMap(dmId, cb);
}

const saveMapChanges = (dmId, changes) => {
    if(!dmId) throw 'Missing dm map id';
    var mapRef = db.collection('maps').doc('map-' + dmId);
    return mapRef.set(changes, { merge: true });
}


export default {
    subscribeToDmMap,
    subscribeToPlayerMap,
    saveMapChanges
}
import 'firebase/firestore';

import firebase from 'firebase/app';

const config = Object.freeze({
    apiKey: "AIzaSyC-r7nYEX2d5RpKzIvGhfeVdogEi5AcIbI",
    authDomain: "dungeon-goggles.firebaseapp.com",
    databaseURL: "https://dungeon-goggles.firebaseio.com",
    projectId: "dungeon-goggles",
    storageBucket: "dungeon-goggles.appspot.com",
    messagingSenderId: "796228271924",
    appId: "1:796228271924:web:ae8fc29291e4cb1a71ef61",
    measurementId: "G-KXMYXSYCQ3"
});

firebase.initializeApp(config);
const db = firebase.firestore();

const getDmMap = async (dmId) => {
    const maps = db.collection("maps");

    const snapshot = await maps.where('dmId', '==', dmId).get();
    if(snapshot.empty) throw "Map not found";

    const mapData = snapshot.docs[0].data();
    console.log(mapData);
    return mapData;
}

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
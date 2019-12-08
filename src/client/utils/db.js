import firebase from 'firebase/app';
import 'firebase/firestore';

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


export default {
    getDmMap
}
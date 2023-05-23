import * as firebase from 'firebase/compat';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

//Configuration for our distinct firebase database
const firebaseConfig = {
    apiKey: "AIzaSyBerOonMDmnH3BO_s1fkJu5oR_EFlmq34o",
    authDomain: "safepal-947e6.firebaseapp.com",
    databaseURL: "https://safepal-947e6-default-rtdb.firebaseio.com",
    projectId: "safepal-947e6",
    storageBucket: "safepal-947e6.appspot.com",
    messagingSenderId: "94875078641",
    appId: "1:94875078641:web:2ba8eb4a44246a35457e50",
    measurementId: "G-DR3SS5HRZK"
};


let app;

//If firebase doesnt exist create it 
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig)
} else {
    app = firebase.app();
}

const realtimeDatabase = firebase.database()
const chatDatabase = app.firestore();
const auth = firebase.auth();


export { chatDatabase, auth, realtimeDatabase };
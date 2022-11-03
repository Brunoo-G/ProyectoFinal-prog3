import app from 'firebase/app'
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCbrA5_d5rFVI_UVY1AUe3SNAOWi2vwUAM",
    authDomain: "toochat-5e0c5.firebaseapp.com",
    projectId: "toochat-5e0c5",
    storageBucket: "toochat-5e0c5.appspot.com",
    messagingSenderId: "698709293036",
    appId: "1:698709293036:web:de7793534bb027eb0cb2c9"
};

app.initializeApp(firebaseConfig)

export const db = app.firestore()
export const storage = app.storage()
export const auth = firebase.auth()
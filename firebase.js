import firebase from "firebase"
import "firebase/storage"
const firebaseConfig = {
    apiKey: "AIzaSyCIYV4t3vybU9-ufiuEVG2mKlnIxv3e5UU",
    authDomain: "ssclone.firebaseapp.com",
    projectId: "ssclone",
    storageBucket: "ssclone.appspot.com",
    messagingSenderId: "813487925367",
    appId: "1:813487925367:web:16b1c5d5ad7bda7296be72",
    measurementId: "G-P7YFMFP9VP"
  };
  const app = !firebase.apps.length?firebase.initializeApp(firebaseConfig):firebase.app();
  const db = app.firestore();
  const stoeage = firebase.storage();
  const rdb = firebase.database();
  export { db,stoeage ,rdb };
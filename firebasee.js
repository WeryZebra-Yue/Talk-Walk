import firebase from "firebase";
import "firebase/storage";
const firebaseConfig = JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG);
const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();
const db = app.firestore();
const stoeage = firebase.storage();
const rdb = firebase.database();
export { db, stoeage, rdb };

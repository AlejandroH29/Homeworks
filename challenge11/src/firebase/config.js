// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth} from "firebase/auth"
import {getStorage} from "firebase/storage"
import {getFirestore} from "firebase/firestore"

import {getDatabase, ref, set, push, onValue} from "firebase/database";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCps1rHDI-Juoi8wdZU9cKFjwKgz_hgGp4",
  authDomain: "clase-09-estructuras2.firebaseapp.com",
  projectId: "clase-09-estructuras2",
  storageBucket: "clase-09-estructuras2.firebasestorage.app",
  messagingSenderId: "626334873205",
  appId: "1:626334873205:web:24fa7a71caf1823a55ea3c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(); 
const firebaseStorage = getStorage();
const db = getFirestore();
const realTimeDb = getDatabase(app);
export {app, auth, firebaseStorage, db, realTimeDb, ref, set, push, onValue}; 
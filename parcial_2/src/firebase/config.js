import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDCv8YULgL4z9c0voVKQtd2-k6m2ZIgZQo",
  authDomain: "parcial2estructuras2.firebaseapp.com",
  projectId: "parcial2estructuras2",
  storageBucket: "parcial2estructuras2.appspot.com",
  messagingSenderId: "775315272315",
  appId: "1:775315272315:web:82b25efc78b5a7dc56e8de"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

export { app, auth, db };
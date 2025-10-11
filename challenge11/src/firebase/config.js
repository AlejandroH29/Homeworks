// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth} from "firebase/auth"

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
export {app, auth}
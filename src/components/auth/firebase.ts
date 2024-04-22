import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDbPLHb773qqUo8Gdx0GQnCUKhwliYgrsI",
    authDomain: "focustudents.firebaseapp.com",
    projectId: "focustudents",
    storageBucket: "focustudents.appspot.com",
    messagingSenderId: "755181517581",
    appId: "1:755181517581:web:90326ab4280f845062ce44"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  // Export the auth and db services for easy access
  export const auth = getAuth(app);
  export const db = getFirestore(app);
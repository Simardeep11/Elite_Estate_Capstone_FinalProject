import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // Import Firebase Storage

const firebaseConfig = {
  apiKey: "AIzaSyAJC3WBSEfpDSOync6FDEiuX9Zh2RaX1Dw",
  authDomain: "software-project-53970.firebaseapp.com",
  projectId: "software-project-53970",
  storageBucket: "software-project-53970.appspot.com",
  messagingSenderId: "254014058688",
  appId: "1:254014058688:web:2d4f29e52e2db8cdf7fd25",
  measurementId: "G-PF2W6WP39V"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app); // Initialize Firebase Storage

export { app, auth, db, storage };

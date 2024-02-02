// Import from the SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBHMwN2UifESW5OSFSU8XrQV2qsjNP0aXo",
  authDomain: "mtwedding-5f309.firebaseapp.com",
  projectId: "mtwedding-5f309",
  storageBucket: "mtwedding-5f309.appspot.com",
  messagingSenderId: "964553528753",
  appId: "1:964553528753:web:b5e14303f464ac50a65990",
  measurementId: "G-SCV16QW58H",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Firebase Authentication
const auth = getAuth(app);

export { db, auth };

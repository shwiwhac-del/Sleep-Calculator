import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBZKTuh1txqL1baOcYGwNIZ_8xUUhG0l-s",
  authDomain: "sleepcalculater.firebaseapp.com",
  projectId: "sleepcalculater",
  storageBucket: "sleepcalculater.firebasestorage.app",
  messagingSenderId: "372108688211",
  appId: "1:372108688211:web:e7cb7d7a094c50ee61ffa6"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

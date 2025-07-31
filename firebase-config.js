// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyDKFbRxGIA5ctgUNFHrHdgkLgGZpCrPsSc",
  authDomain: "homepage-a85e7.firebaseapp.com",
  projectId: "homepage-a85e7",
  storageBucket: "homepage-a85e7.appspot.com",
  messagingSenderId: "54702132892",
  appId: "1:54702132892:web:f39449bb58ded41f036759"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);

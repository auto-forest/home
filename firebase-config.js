// Firebase 설정 파일
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore-lite.js";

const firebaseConfig = {
  apiKey: "AIzaSyDKFbRxGIA5ctgUNFHrHdgkLgGZpCrPsSc",
  authDomain: "homepage-a85e7.firebaseapp.com",
  projectId: "homepage-a85e7",
  storageBucket: "homepage-a85e7.appspot.com",
  messagingSenderId: "54702132892",
  appId: "1:54702132892:web:f39449bb58ded41f036759",
  measurementId: "G-KYCZR5JSW1"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCbdtBIaoTLgo1SUEmsfPLHA_4KuptMiTg",
  authDomain: "strapichat.firebaseapp.com",
  projectId: "strapichat",
  storageBucket: "strapichat.appspot.com",
  messagingSenderId: "1025219426688",
  appId: "1:1025219426688:web:912f11e71bb818a6922965",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

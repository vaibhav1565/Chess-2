// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDr3-reqod7LfXqy5zI-Vx2bMWbn_xpV_w",
    authDomain: "netflix-gpt-907bf.firebaseapp.com",
    projectId: "netflix-gpt-907bf",
    storageBucket: "netflix-gpt-907bf.firebasestorage.app",
    messagingSenderId: "850529315652",
    appId: "1:850529315652:web:1117d4eead8178077d0511"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
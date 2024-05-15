


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC-PRr0gdVG9IKmbkPxC2dcI2YUo_OfwNg",
    authDomain: "library-store-ea7c7.firebaseapp.com",
    projectId: "library-store-ea7c7",
    storageBucket: "library-store-ea7c7.appspot.com",
    messagingSenderId: "962858875196",
    appId: "1:962858875196:web:54fd899555194afe0a4639",
    measurementId: "G-NXPE2NXM8V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

let db = getFirestore(app);

let auth = getAuth(app);

export { db, auth }
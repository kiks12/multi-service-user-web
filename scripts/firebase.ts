
/*

Multi Service Platform - Firebase Configuration
Created: Feb. 09, 2022
Last Updated: Feb. 10, 2022
Author: Tolentino, Francis James S.

*/


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAGUm9lwvoFNzgRkoUErcDZGzC2x26MDXo",
  authDomain: "multiserviceplatfromdev.firebaseapp.com",
  projectId: "multiserviceplatfromdev",
  storageBucket: "multiserviceplatfromdev.appspot.com",
  messagingSenderId: "917044662078",
  appId: "1:917044662078:web:b7ac6ec1703b489f23666f",
  measurementId: "G-RH05FBW30P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const GoogleProvider = new GoogleAuthProvider();
GoogleProvider.setCustomParameters({
  prompt: 'select_account',
})
export const auth = getAuth(app);

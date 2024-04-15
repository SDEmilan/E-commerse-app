// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth,GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCTNBMaK0XLsVxulizPhiNVfnSamX7_zFQ",
  authDomain: "auth-63ab5.firebaseapp.com",
  projectId: "auth-63ab5",
  storageBucket: "auth-63ab5.appspot.com",
  messagingSenderId: "834169936436",
  appId: "1:834169936436:web:fbeca5ae62b131b14b0861",
  measurementId: "G-9C9YXN6WK6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const doSignOut=()=>auth.signOut()
const analytics = getAnalytics(app);
const auth=getAuth(app)
const provider=new GoogleAuthProvider()
export {auth,provider}
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAo8MuOW-36ITEolYdtdXeoez9xIgINzpc",
  authDomain: "essai2-62888.firebaseapp.com",
  projectId: "essai2-62888",
  storageBucket: "essai2-62888.appspot.com",
  messagingSenderId: "280144792222",
  appId: "1:280144792222:web:7bb8f8035cf293baba498f",
  measurementId: "G-ZZRVRC3XNN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const messaging = app.messaging();
export default app;
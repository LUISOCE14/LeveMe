import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCcbeNMC2wnlkgDbM3wMdlegG2Qo9EDUn8",
  authDomain: "leveme-9adf7.firebaseapp.com",
  databaseURL: "https://leveme-9adf7-default-rtdb.firebaseio.com",
  projectId: "leveme-9adf7",
  storageBucket: "leveme-9adf7.appspot.com",
  messagingSenderId: "616575979470",
  appId: "1:616575979470:web:1442f517cb0ea28f1ea59f",
  measurementId: "G-8CXVB66MQF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
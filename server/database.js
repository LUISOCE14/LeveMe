const firebaseConfig = {
    apiKey: "AIzaSyCcbeNMC2wnlkgDbM3wMdlegG2Qo9EDUn8",
    authDomain: "leveme-9adf7.firebaseapp.com",
    databaseURL: "https://leveme-9adf7-default-rtdb.firebaseio.com",
    projectId: "leveme-9adf7",
    storageBucket: "leveme-9adf7.appspot.com",
    messagingSenderId: "616575979470",
    appId: "1:616575979470:web:0d63b572190cd3da1ea59f",
    measurementId: "G-G7KN2SZY38"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
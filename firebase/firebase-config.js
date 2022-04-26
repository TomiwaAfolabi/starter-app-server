// Import the functions you need from the SDKs you need

const { initializeApp } = require ("firebase/app");
const { getAuth } = require ("firebase/auth");

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyARhs5vjnV2E7xp0w7RC3-Ua_wqhuAGdqE",
  authDomain: "starter-c33e3.firebaseapp.com",
  projectId: "starter-c33e3",
  storageBucket: "starter-c33e3.appspot.com",
  messagingSenderId: "915838812068",
  appId: "1:915838812068:web:df5cebb2aad990fbc30b31",
  measurementId: "G-CDLNN9D4WX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const authentication = getAuth(app);




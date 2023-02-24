import { initializeApp } from "firebase/app";
import { getStorage, ref } from "firebase/storage";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
    apiKey: "AIzaSyCttFPH3tkX_cN5XObiFHCc9ZXtc8FJWOM",
    authDomain: "bukd-app.firebaseapp.com",
    databaseURL: "https://bukd-app-default-rtdb.firebaseio.com",
    projectId: "bukd-app",
    storageBucket: "bukd-app.appspot.com",
    messagingSenderId: "973982768586",
    appId: "1:973982768586:web:33b86af9cfb2ebf9e1c333",
    measurementId: "G-P42R6W0MKR"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export {app}


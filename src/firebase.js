import * as firebase from "firebase/app";

import "firebase/firestore";
import "firebase/analytics";
import "firebase/auth";
import "firebase/functions";

var firebaseConfig = {
  apiKey: "AIzaSyAEsgcHuZy5g7NDhJZbLDI7bQZuizL9rXo",
  authDomain: "event-sched-43719.firebaseapp.com",
  databaseURL: "https://event-sched-43719.firebaseio.com",
  projectId: "event-sched-43719",
  storageBucket: "event-sched-43719.appspot.com",
  messagingSenderId: "796993155579",
  appId: "1:796993155579:web:3543b38b046e30e2881b5e",
  measurementId: "G-N2X9GY7SB9"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;

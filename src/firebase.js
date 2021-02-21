import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";

const app = firebase.initializeApp({
  apiKey: "AIzaSyA6_j7skRbMOQCVcGggC375O1FtRMG4Cv0",
  authDomain: "goa-food-354bd.firebaseapp.com",
  databaseURL: "https://goa-food-354bd-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "goa-food-354bd",
  storageBucket: "goa-food-354bd.appspot.com",
  messagingSenderId: "164535159572",
  appId: "1:164535159572:web:b794ac168660cb5e6a5001",
  measurementId: "G-34VEFV73XS"
});

export const auth = app.auth();
export default app;

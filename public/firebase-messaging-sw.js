importScripts('https://www.gstatic.com/firebasejs/8.2.10/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.10/firebase-messaging.js');

 if ('serviceWorker' in navigator) {
     navigator.serviceWorker.register('../firebase-messaging-sw.js')
       .then(function(registration) {
         console.log('Registration successful, scope is:', registration.scope);
       }).catch(function(err) {
         console.log('Service worker registration failed, error:', err);
       });
     }

 firebase.initializeApp({
    apiKey: "AIzaSyA6_j7skRbMOQCVcGggC375O1FtRMG4Cv0",
    authDomain: "goa-food-354bd.firebaseapp.com",
    databaseURL: "https://goa-food-354bd-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "goa-food-354bd",
    storageBucket: "goa-food-354bd.appspot.com",
    messagingSenderId: "164535159572",
    appId: "1:164535159572:web:b794ac168660cb5e6a5001",
    measurementId: "G-34VEFV73XS"
   })

 const initMessaging = firebase.messaging()

 initMessaging.setBackgroundMessageHandler(function (payload) {
  console.log(payload.data.badgeCount);
  let title = "goa food";
  let options = {
    body: payload.data
  }

  return self.registration.showNotification(title, options);
 });
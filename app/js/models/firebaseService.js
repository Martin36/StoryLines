app.factory("FirebaseService", function() {

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAnGNc08nedi09D3T-vSW-kLN_lFFEjcDA",
    authDomain: "storylines-784ba.firebaseapp.com",
    databaseURL: "https://storylines-784ba.firebaseio.com",
    projectId: "storylines-784ba",
    storageBucket: "storylines-784ba.appspot.com",
    messagingSenderId: "631528991893"
  };
  firebase.initializeApp(config);

});

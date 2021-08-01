var firebaseConfig = {
  apiKey: "AIzaSyCF1_qwD_r0SFbH66oyc7GdVkegXwrxmEw",
  authDomain: "moniquechetty-amclone2.firebaseapp.com",
  projectId: "moniquechetty-amclone2",
  storageBucket: "moniquechetty-amclone2.appspot.com",
  messagingSenderId: "147920653429",
  appId: "1:147920653429:web:78738bdc2850f92ac6fc3c",
  measurementId: "G-ZMGVPKKBCQ",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

var db = firebase.firestore();

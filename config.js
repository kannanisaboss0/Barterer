import firebase from 'firebase'

require('@firebase/firestore')

var firebaseConfig = {
    apiKey: "AIzaSyCb_e7jPkzSZsOVrA6crUY20tuJRgMm_VI",
    authDomain: "barterer-73d5d.firebaseapp.com",
    databaseURL: "https://barterer-73d5d.firebaseio.com",
    projectId: "barterer-73d5d",
    storageBucket: "barterer-73d5d.appspot.com",
    messagingSenderId: "673650676047",
    appId: "1:673650676047:web:e77877bb73677f0078353a",
    measurementId: "G-D6GBLR1KG7"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

   export default firebase.firestore();
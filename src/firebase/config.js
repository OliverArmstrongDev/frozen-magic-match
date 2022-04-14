import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';


//config

const firebaseConfig = {
    apiKey: "AIzaSyDh_Bu7QVhQwCVugxXnV2j9YNhTK2T5sOs",
    authDomain: "magic-match-c4aea.firebaseapp.com",
    projectId: "magic-match-c4aea",
    storageBucket: "magic-match-c4aea.appspot.com",
    messagingSenderId: "621450955556",
    appId: "1:621450955556:web:5ce2c115ed3fe0aca801b1"
  };

  //init firebase

  firebase.initializeApp(firebaseConfig);

  //init service
  const projectFirestore = firebase.firestore();
  const projectAuth = firebase.auth();

  //timestamp

  const timeStamp = firebase.firestore.Timestamp;


  export {projectFirestore, projectAuth, timeStamp}
import firebase from "firebase/app";
import 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFDJW6NulO9QBv6XRb9UstUuB6il5a3Gg",
  authDomain: "proyecto-react-a1f5e.firebaseapp.com",
  projectId: "proyecto-react-a1f5e",
  storageBucket: "proyecto-react-a1f5e.appspot.com",
  messagingSenderId: "298272229824",
  appId: "1:298272229824:web:5954f41f065cb5aa13a025"
};

const app = firebase.initializeApp(firebaseConfig)

export const getFirestore = () =>{
    return firebase.firestore(app)
}

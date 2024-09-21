// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {QueryDocumentSnapshot} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDkPLuM6cKYmCBO3cNWg8nkW7MH0tKIF4o",
    authDomain: "family-tree-app-fb544.firebaseapp.com",
    databaseURL: "https://family-tree-app-fb544-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "family-tree-app-fb544",
    storageBucket: "family-tree-app-fb544.appspot.com",
    messagingSenderId: "36137864008",
    appId: "1:36137864008:web:9210fc04b56a3560f4817d"
};
export const converter = <T>() => ({
    toFirestore: (data: T) => (data),
    fromFirestore: (snap: QueryDocumentSnapshot) => {
        return (snap.data() as T)
    }
})

export const collections = {
    people: 'people',
    trees: 'trees',
    users: 'users',
}

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
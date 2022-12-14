// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { 
    getAuth, 
    signInWithPopup, 
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth'
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,

} from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDt79tIZ8q5DqrGjtDK8_-stMmYeIUT7js",
  authDomain: "crwn-clothing-ad097.firebaseapp.com",
  projectId: "crwn-clothing-ad097",
  storageBucket: "crwn-clothing-ad097.appspot.com",
  messagingSenderId: "806819839063",
  appId: "1:806819839063:web:d9704bc8a1238d806ef712"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth();
export const signInWithGooglePopup = () => 
signInWithPopup(auth,provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    if(!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid);


    const userSnapShot = await getDoc(userDocRef);

    //if user data does not exist
    //create / set the document with the data from userAuth in my collection

    if(!userSnapShot.exists()) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef,{
                displayName,
                email,
                createdAt,
                ...additionalInformation
            })
        }catch(error){
            console.log('error creating the user', error.message)
        }
    }
    

    //if user data exists
    //return userDocref
    return userDocRef;

}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password);
  };

  export const signOutUser = async () => await signOut(auth);

  export const onAuthStateChangedListener =  (callback) => onAuthStateChanged(auth, callback);
import { async } from "@firebase/util";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// 1. Connect firebase app instance with firebase instance on server
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBWHpTeUzu4XAknxogPT8TrFUS1mN52kJ4",
  authDomain: "clothing-shell-db.firebaseapp.com",
  projectId: "clothing-shell-db",
  storageBucket: "clothing-shell-db.appspot.com",
  messagingSenderId: "69517782962",
  appId: "1:69517782962:web:7088ebf9228f44e0f47eab",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// 2. Setup authentication

// gives diff ways of authenticating with google
const googleProvider = new GoogleAuthProvider();

// way we want google auth provider to behave
googleProvider.setCustomParameters({ prompt: "select_account" });

// exporting authentication & instance of signInWithPopup
export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

// 3. Create DB
export const db = getFirestore();

// use the DB
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid); // returns doc ref in DB
  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef); //checks for data in DB
  console.log(userSnapshot);

  // if user data does not exists; store in database
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (err) {
      console.log(err);
    }
  }

  // if user data exists; dont do anything

  // return userDocRef
  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

// authenticate user with email & password; compare with data stored in firebase
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

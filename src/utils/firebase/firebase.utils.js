import { async } from "@firebase/util";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from "firebase/firestore";

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

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db); // batch object

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, "categories"); // creating collection reference
  const q = query(collectionRef);
  const querySnapshot = await getDocs(q);

  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    // docSnapshot gives each document from categories collection
    // docSnapshot.data() gives data of each document
    const { title, items } = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});

  return categoryMap;
};

// use the DB
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid); // returns doc ref in DB

  const userSnapshot = await getDoc(userDocRef); //checks for data in DB

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

export const signOutUser = async () => await signOut(auth);

// helper function for leveraging onAuthStateChanged()
export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);

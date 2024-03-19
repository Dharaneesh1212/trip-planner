import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc, Timestamp } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCaU_Eo3fdyQHCEcEvZ1LJCPWj50brhkCU",
    authDomain: "travel-planner-c8bb5.firebaseapp.com",
    projectId: "travel-planner-c8bb5",
    storageBucket: "travel-planner-c8bb5.appspot.com",
    messagingSenderId: "25629629393",
    appId: "1:25629629393:web:030163f3fa0d1f73ce9ef0",
  };

// Initialize Firebase
const travelApp = initializeApp(firebaseConfig);

// Authentication
const travelAuth = getAuth(travelApp);

// Sign in with Google
const googleProvider = new GoogleAuthProvider();

const signInWithGooglePopUp = async () =>
  signInWithPopup(travelAuth, googleProvider);

const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return createUserWithEmailAndPassword(travelAuth, email, password);
};

const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return signInWithEmailAndPassword(travelAuth, email, password);
};

// Firestore database
const travelDb = getFirestore(travelApp);

const createUserDocumentFromAuth = async (userAuth) => {
  if (!userAuth) return;

  const userDocRef = doc(travelDb, "users", userAuth.uid);
  const userSnapShot = await getDoc(userDocRef);

  if (!userSnapShot.exists()) {
    const { displayName, email } = userAuth;
  
    if (displayName) {
      const createdAt = Timestamp.now();
  
      try {
        await setDoc(userDocRef, {
          displayName,
          email,
          createdAt,
        });
        console.log("User document created successfully!");
      } catch (error) {
        console.error("Error creating user document:", error);
      }
    } else {
      console.error("Display name is null");
    }
  } else {
    console.log("User document already exists.");
  }

  return userDocRef;
};

export {
  signInWithGooglePopUp,
  createUserDocumentFromAuth,
  createAuthUserWithEmailAndPassword,
  signInAuthUserWithEmailAndPassword,
  travelAuth,
};

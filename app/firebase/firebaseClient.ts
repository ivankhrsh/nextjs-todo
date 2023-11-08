import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";
import {GithubAuthProvider, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { toast } from "react-toastify";

const clientCredentials = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export const firebase_app = initializeApp(clientCredentials);
export const auth = getAuth(firebase_app);
export const db = getFirestore(firebase_app);
export const provider = new GithubAuthProvider();

export const loginWithWithEmail = (email: string, password: string) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      return user;
    })
    .catch((error) => {
      toast.error(error.message); 
    });
};

export const createUser = (email: string, password: string) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      return user;
    })
    .catch((error) => {
      // Handle sign-up error
      toast.error(error.message);
    });
};

export function signInWithGithub() {
  signInWithPopup(auth, provider);
}
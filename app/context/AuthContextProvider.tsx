'use client'
import { useContext, createContext, useState, ReactNode, useEffect } from 'react';
import { signInWithPopup, signOut, onAuthStateChanged, GithubAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/clientApp'
import { User as FirebaseUser } from "firebase/auth";
import { toast } from 'react-toastify';

const AuthContext = createContext<any>(null);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null)

  const gitHubSignIn = () => {
    const provider = new GithubAuthProvider();
    signInWithPopup(auth, provider)
  }

  const createUser = (email: string, password: string) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
      })
      .catch((error) => {
        // Handle sign-up error
        toast.error(error.message);
      });
  };

  const signInWithEmail = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
      })
      .catch((error) => {
        // Handle sign-in error
        toast.error(error.message); 
      });
  };


  const logOut = () => {
    signOut(auth);
  }

  useEffect( () => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })
    return () => unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ user, gitHubSignIn, logOut, createUser, signInWithEmail}}>
      {children}
    </AuthContext.Provider>
  );
}

export const UserAuth = () => {
  return useContext(AuthContext);
}

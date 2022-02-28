import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';
import { useContext, createContext, useState, useEffect } from 'react';
import { auth } from '../services/firebase';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return signOut(auth);
  }
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('HER');
      setCurrentUser(user);
      console.log(currentUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);
  const value = { currentUser, signup, login, logout };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}

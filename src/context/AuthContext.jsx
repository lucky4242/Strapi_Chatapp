import { createContext, useState, useEffect, useContext } from "react";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithRedirect,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase";

//create context
const AuthContext = createContext();
//provider context
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUSer] = useState("");
  const [loading, setLoading] = useState(true);

  //   signin with google
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  };

  // signout from google
  const logout = () => signOut(auth);
  const value = {
    currentUser,
    setCurrentUSer,
    signInWithGoogle,
    logout,
  };

  // set currentUser
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUSer(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};

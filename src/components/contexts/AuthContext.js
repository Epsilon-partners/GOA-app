import React, { useContext, useState, useEffect } from "react";
import { auth } from "../../firebase";
import firebase from "../../firebase";

const AuthContext = React.createContext();

const db = firebase.firestore();
const settings = { timestampsInSnapshots: true };
db.settings(settings);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  const signup = (email, password, user) => {
    return auth
      .createUserWithEmailAndPassword(email, password)
      .then((cred) => {
        return db
          .collection("users")
          .doc(cred.user.uid)
          .set({
            ...user,
            email,
          })
      })
      .catch((err) => {
        throw err;
      }); 
  };

  const login = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password)
  };

  const logout = () => {
    return auth.signOut(); 
  };

  const resetPassword = (email) => {
    return auth.sendPasswordResetEmail(email);
  };

  const updateEmail = (email) => {
    return currentUser.updateEmail(email);
  };

  const updatePassword = (password) => {
    return currentUser.updatePassword(password);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

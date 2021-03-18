import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import firebase from "../firebase";

export default function AdminRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth();
  const [finalUser, setFinalUser] = useState();

  useEffect(() => {
    const getUser = () => {
      if (currentUser) {
        const db = firebase.firestore();
        db.collection("users")
          .doc(currentUser.uid)
          .get()
          .then((doc) => {
            setFinalUser(doc.data());
          })
          .catch((err) => console.error(err));
      }
    };
    getUser();
  }, [currentUser]);

  return (
    <>
    {currentUser && finalUser &&
      <Route
      {...rest}
      render={(props) => {
        return finalUser && finalUser._IS_ADMIN_ ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        );
      }}
    ></Route>
    }
    </>
  );
}

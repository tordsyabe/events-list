import React, { createContext, useState, useEffect } from "react";
import firebase from "../firebase";
import { withRouter } from "react-router-dom";

export const AuthContext = createContext();

const AuthContextProvider = props => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAdmin, setIsAdmin] = useState(null);
  const [isAdminAuthen, setIsAdminAuthen] = useState(true);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      setCurrentUser(user);
      if (user === null) {
        setIsAuthenticating(true);
        setIsAdminAuthen(true);
      } else {
        user
          .getIdTokenResult()
          .then(idTokenResult => {
            if (idTokenResult.claims.admin) {
              setIsAdmin(true);
              setIsAdminAuthen(false);
              console.log("isAdmin: ", isAdmin);
            }
          })
          .catch(error => console.log(error));
        setIsAuthenticating(false);
        setIsAdminAuthen(false);
      }

      if (user === null && props.location.pathname !== "/login") {
        setIsAuthenticating(false);
        setIsAdmin(null);
        setIsAdminAuthen(false);
      }

      if (user !== null) {
      }
    });
  });

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticating,
        isAdmin,
        isAdminAuthen
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default withRouter(AuthContextProvider);

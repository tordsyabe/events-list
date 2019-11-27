import React, { useContext } from "react";
import { AuthContext } from "./contexts/AuthContext";
import { Route, Redirect, withRouter } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { currentUser, isAuthenticating, isAdminAuthen, isAdmin } = useContext(
    AuthContext
  );
  return (
    <Route
      {...rest}
      render={props => {
        if (isAuthenticating || isAdminAuthen)
          return (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <CircularProgress />
            </div>
          );

        if (!currentUser) {
          return <Redirect to={{ pathname: "/login" }} />;
        }

        if (!!currentUser) {
          return <Component {...props} />;
        }
      }}
    />
  );
};

export default withRouter(PrivateRoute);

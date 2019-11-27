import React, { useContext } from "react";
import { AuthContext } from "./contexts/AuthContext";
import { Route, Redirect, withRouter } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";

const AdminPrivateRoute = ({ component: Component, ...rest }) => {
  const { currentUser, isAdmin, isAdminAuthenticating } = useContext(
    AuthContext
  );
  return (
    <Route
      {...rest}
      render={props => {
        if (isAdmin === null)
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
        return isAdmin ? (
          <Component {...props} />
        ) : currentUser === null && isAdmin === null ? (
          <Redirect
            to={{
              pathname: "/login"
            }}
          />
        ) : (
          <Redirect to={{ pathname: "/" }} />
        );
      }}
    />
  );
};

export default withRouter(AdminPrivateRoute);

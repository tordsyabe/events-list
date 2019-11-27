import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";

import Home from "./components/Home";
import Admin from "./components/admin/Admin";
import NotFound from "./components/NotFound";
import Login from "./components/auth/Login";
import PrivateRoute from "./PrivateRoute";
import AddingAdmin from "./components/admin/AddingAdmin";

import { AuthContext } from "./contexts/AuthContext";

const Routes = props => {
  const { isAdmin } = React.useContext(AuthContext);
  return (
    <Switch>
      <PrivateRoute exact path="/" component={Home} />
      <PrivateRoute exact path="/admin" component={Admin} />
      <PrivateRoute exact path="/admin/make-admin" component={AddingAdmin} />
      <Route exact path="/login" component={Login} />

      <Route component={NotFound} />
    </Switch>
  );
};

export default withRouter(Routes);

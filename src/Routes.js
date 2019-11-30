import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";

import Home from "./components/Home";
import Admin from "./components/admin/Admin";
import NotFound from "./components/NotFound";
import Login from "./components/auth/Login";
import PrivateRoute from "./PrivateRoute";
import AddingAdmin from "./components/admin/AddingAdmin";

import { AuthContext } from "./contexts/AuthContext";
import { EventFormContext } from "./contexts/EventFormContext";
import { SnackBarContext } from "./contexts/SnackBarContext";
import EventForm from "./components/Forms/EventForm";

const Routes = props => {
  return (
    <React.Fragment>
      <Switch>
        <PrivateRoute exact path='/' component={Home} />
        <PrivateRoute exact path='/admin' component={Admin} />
        <PrivateRoute exact path='/admin/make-admin' component={AddingAdmin} />
        <Route exact path='/login' component={Login} />

        <Route component={NotFound} />
      </Switch>
    </React.Fragment>
  );
};

export default withRouter(Routes);

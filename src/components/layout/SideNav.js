import React, { useContext } from "react";

import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MailIcon from "@material-ui/icons/Mail";
import { SideNavContext } from "../../contexts/SideNavContext";
import { NavLink, withRouter } from "react-router-dom";

import firebase from "../../firebase";

const SideNav = props => {
  const { toggleSideNav, toggleDrawer } = useContext(SideNavContext);
  const logout = () => {
    firebase.auth().signOut();
  };

  const sideList = () => (
    <div
      role='presentation'
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
      style={{ width: "220px" }}
    >
      <List>
        <NavLink to='/' style={{ textDecoration: "none", color: "black" }}>
          <ListItem button selected={props.location.pathname === "/"}>
            <ListItemIcon>{<MailIcon />}</ListItemIcon>
            <ListItemText primary={"Home"} />
          </ListItem>
        </NavLink>

        <NavLink to='/admin' style={{ textDecoration: "none", color: "black" }}>
          <ListItem button selected={props.location.pathname === "/admin"}>
            <ListItemIcon>{<MailIcon />}</ListItemIcon>
            <ListItemText primary={"Admin"} />
          </ListItem>
        </NavLink>

        <ListItem button onClick={logout}>
          <ListItemIcon>{<MailIcon />}</ListItemIcon>
          <ListItemText primary={"Logout"} />
        </ListItem>
      </List>
    </div>
  );
  return (
    <div>
      <SwipeableDrawer
        open={toggleSideNav.open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        {sideList()}
      </SwipeableDrawer>
    </div>
  );
};

export default withRouter(SideNav);

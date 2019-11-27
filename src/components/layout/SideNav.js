import React, { useContext } from "react";

import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import EventNoteRoundedIcon from "@material-ui/icons/EventNoteRounded";
import ExitToAppRoundedIcon from "@material-ui/icons/ExitToAppRounded";
import { SideNavContext } from "../../contexts/SideNavContext";
import { NavLink, withRouter } from "react-router-dom";

import firebase from "../../firebase";
import { AuthContext } from "../../contexts/AuthContext";
import { Avatar, Divider } from "@material-ui/core";

import { getDay, getMonth, getYear } from "../../utils/Utils";

const SideNav = props => {
  const { toggleSideNav, toggleDrawer } = useContext(SideNavContext);
  const { currentUser } = useContext(AuthContext);
  const logout = () => {
    firebase.auth().signOut();
  };

  const day = getDay(new Date());
  const month = getMonth(new Date());
  const year = getYear(new Date());

  const sideList = () => (
    <div
      role='presentation'
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
      style={{ width: "300px" }}
    >
      <List>
        <ListItem>
          <ListItemIcon>
            {
              <Avatar
                alt='Remy Sharp'
                src='https://mltmpgeox6sf.i.optimole.com/lYou2G39eng/w:auto/h:auto/q:auto/https://redbanksmilesnj.com/wp-content/uploads/2015/11/man-avatar-placeholder.png'
              />
            }
          </ListItemIcon>
          <ListItemText
            primary={currentUser.email}
            secondary={`${month} ${day}, ${year}`}
          />
        </ListItem>
        <Divider />
        <NavLink to='/' style={{ textDecoration: "none", color: "black" }}>
          <ListItem button selected={props.location.pathname === "/"}>
            <ListItemIcon>{<HomeRoundedIcon />}</ListItemIcon>
            <ListItemText primary={"Home"} />
          </ListItem>
        </NavLink>

        <NavLink to='/admin' style={{ textDecoration: "none", color: "black" }}>
          <ListItem button selected={props.location.pathname === "/admin"}>
            <ListItemIcon>{<EventNoteRoundedIcon />}</ListItemIcon>
            <ListItemText primary={"Admin"} />
          </ListItem>
        </NavLink>

        <ListItem button onClick={logout}>
          <ListItemIcon>{<ExitToAppRoundedIcon />}</ListItemIcon>
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

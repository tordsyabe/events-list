import React, { useContext, useEffect } from "react";

import { AppBar, Toolbar, IconButton, Typography } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { SideNavContext } from "../../contexts/SideNavContext";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import { fade, makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { EventsContext } from "../../contexts/EventsContext";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 120,
      "&:focus": {
        width: 200
      }
    }
  }
}));

const Nav = () => {
  const classes = useStyles();
  const matches = useMediaQuery(theme => theme.breakpoints.up("sm"));

  const [searchKey, setSearchKey] = React.useState("");

  const { toggleDrawer } = useContext(SideNavContext);
  const { events, setSearchResults } = useContext(EventsContext);

  useEffect(() => {
    const filteredEvents = events.filter(event =>
      event.team
        .toString()
        .toLowerCase()
        .includes(searchKey.toLowerCase())
    );

    setSearchResults(filteredEvents);
  }, [searchKey]);

  return (
    <div style={{ flexGrow: "1" }}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            edge='start'
            color='inherit'
            aria-label='menu'
            style={{ marginRight: "1rem" }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' style={{ flexGrow: "1" }}>
            {matches ? "Events" : null}
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder='Search...'
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              inputProps={{ "aria-label": "search", value: searchKey }}
              onChange={e => setSearchKey(e.target.value)}
            />
          </div>
          {/* <Button color="inherit">
            <Link to="/" style={{ color: "white", textDecoration: "none" }}>
              Home
            </Link>
          </Button>
          <Button color="inherit">
            <Link
              style={{
                color: "white",
                textDecoration: "none"
              }}
              to="/admin"
            >
              Events List
            </Link>
          </Button> */}

          {/* <Button color="inherit" onClick={logout}>
            Logout
          </Button> */}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Nav;

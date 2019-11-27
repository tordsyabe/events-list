import React, { createContext, useState } from "react";

export const SideNavContext = createContext();

const SideNavContextProvider = props => {
  const [toggleSideNav, setToggleSideNav] = useState({
    open: false
  });

  const toggleDrawer = open => event => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setToggleSideNav({ open });
  };

  return (
    <SideNavContext.Provider
      value={{ toggleSideNav, setToggleSideNav, toggleDrawer }}
    >
      {props.children}
    </SideNavContext.Provider>
  );
};

export default SideNavContextProvider;

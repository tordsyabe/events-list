import React, { createContext } from "react";

export const SnackBarContext = createContext();

const SnackBarContextProvider = props => {
  const [snackBarState, setSnackBarState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center"
  });

  const handleCloseSnackBar = () => {
    setSnackBarState({ ...snackBarState, open: false });
  };
  return (
    <SnackBarContext.Provider
      value={{ snackBarState, setSnackBarState, handleCloseSnackBar }}
    >
      {props.children}
    </SnackBarContext.Provider>
  );
};

export default SnackBarContextProvider;

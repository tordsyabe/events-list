import React from "react";

import { BrowserRouter } from "react-router-dom";
import Routes from "./Routes";

import AuthContextProvider from "./contexts/AuthContext";
import EventsContextProvider from "./contexts/EventsContext";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { deepPurple } from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#1976d2"
    },
    secondary: deepPurple
  }
});

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <AuthContextProvider>
          <EventsContextProvider>
            <Routes />
          </EventsContextProvider>
        </AuthContextProvider>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;

import React from "react";

import { BrowserRouter } from "react-router-dom";
import Routes from "./Routes";

import AuthContextProvider from "./contexts/AuthContext";
import EventsContextProvider from "./contexts/EventsContext";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { red, pink, blue } from "@material-ui/core/colors";
import EventFormContxtProvider from "./contexts/EventFormContext";
import SnackBarContextProvider from "./contexts/SnackBarContext";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: blue[700]
    },
    secondary: pink,
    error: red
  }
});

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <AuthContextProvider>
          <EventsContextProvider>
            <EventFormContxtProvider>
              <SnackBarContextProvider>
                <Routes />
              </SnackBarContextProvider>
            </EventFormContxtProvider>
          </EventsContextProvider>
        </AuthContextProvider>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;

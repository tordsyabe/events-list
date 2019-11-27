import React from "react";

import { BrowserRouter } from "react-router-dom";
import Routes from "./Routes";

import AuthContextProvider from "./contexts/AuthContext";
import EventsContextProvider from "./contexts/EventsContext";

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <EventsContextProvider>
          <Routes />
        </EventsContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;

import React, { createContext, useState, useEffect, useContext } from "react";

import firebase from "../firebase";
import { AuthContext } from "./AuthContext";

export const EventsContext = createContext();

const EventsContextProvider = props => {
  const [events, setEvents] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const { currentUser } = useContext(AuthContext);
  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("events")
      .orderBy("eventDate.eventStartDate")
      .onSnapshot(
        snapShot => {
          const newEvents = snapShot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setEvents(newEvents);
          setSearchResults(newEvents);
        },
        error => console.log(error)
      );

    return () => unsubscribe();
  }, [currentUser]);

  return (
    <EventsContext.Provider
      value={{ events, setEvents, searchResults, setSearchResults }}
    >
      {props.children}
    </EventsContext.Provider>
  );
};

export default EventsContextProvider;

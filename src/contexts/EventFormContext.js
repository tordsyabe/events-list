import React, { createContext } from "react";

export const EventFormContext = createContext();

const EVentFormContxtProvider = props => {
  const [formState, setFormState] = React.useState(false);

  const [eventId, setEventId] = React.useState("");
  const [selectStartDate, setSelectStartDate] = React.useState(new Date());
  const [selectEndDate, setSelectEndDate] = React.useState(new Date());
  const [eventName, setEventName] = React.useState("");
  const [organizer, setOrganizer] = React.useState("");

  const [eventLocation, setLocation] = React.useState("");
  const [paperType, setPaperType] = React.useState("");
  const [badgeCount, setBadgeCount] = React.useState(0);
  const [terminal, setTerminal] = React.useState(0);
  const [printer, setPrinter] = React.useState(0);

  const [kiosk, setKiosk] = React.useState(0);
  const [onsiteTeam, setOnsiteTeam] = React.useState([]);

  const handleFormClose = () => {
    setFormState(false);
    setEventId("");
    setSelectEndDate(new Date());
    setSelectStartDate(new Date());
    setEventName("");
    setOrganizer("");

    setLocation("");
    setPaperType("");
    setBadgeCount("");
    setTerminal("");
    setPrinter("");

    setKiosk("");
    setOnsiteTeam([]);
  };
  return (
    <EventFormContext.Provider
      value={{
        formState,
        setFormState,
        handleFormClose,
        eventId,
        setEventId,
        selectStartDate,
        setSelectStartDate,
        selectEndDate,
        setSelectEndDate,
        eventName,
        setEventName,
        organizer,
        setOrganizer,
        eventLocation,
        setLocation,
        paperType,
        setPaperType,
        badgeCount,
        setBadgeCount,
        terminal,
        setTerminal,
        printer,
        setPrinter,
        kiosk,
        setKiosk,
        onsiteTeam,
        setOnsiteTeam
      }}
    >
      {props.children}
    </EventFormContext.Provider>
  );
};

export default EVentFormContxtProvider;

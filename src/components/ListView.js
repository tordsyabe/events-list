import React, { Fragment, useContext, useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  IconButton,
  Chip
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

import { AuthContext } from "../contexts/AuthContext";

import AlertDialog from "./ui/AlertDialog";
import { EventFormContext } from "../contexts/EventFormContext";
import { withRouter } from "react-router-dom";

const ListView = ({ event, width, location }, props) => {
  const { isAdmin } = useContext(AuthContext);
  const {
    setFormState,
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
  } = React.useContext(EventFormContext);
  const [openAlertDialog, setOpenAlertDialog] = useState(false);

  const handleCloseAlertDialog = () => {
    setOpenAlertDialog(false);
  };

  const handleOpenAlertDialog = () => {
    setOpenAlertDialog(true);
  };

  return (
    <React.Fragment>
      <List
        style={{
          width: `${width}%`,
          minHeight: "88px",
          height: "88px"
        }}
        disablePadding
      >
        <ListItem
          divider
          button
          style={{ width: "100%", minHeight: "88px", height: "88px" }}
        >
          <ListItemText
            style={{ flex: "1" }}
            primary={
              <Typography variant='subtitle2'>
                {event.eventDate.eventMonth}
              </Typography>
            }
            secondary={event.eventDate.eventDays}
          />
          <ListItemText
            style={{ flex: "1.6" }}
            primary={
              <Typography variant='subtitle2'>{event.eventName}</Typography>
            }
            secondary={event.eventOrganizer}
          />

          <ListItemText
            primary={
              <Typography variant='subtitle2'>{event.location}</Typography>
            }
            style={{ flex: "1" }}
          />
          <ListItemText
            primary={
              <Typography variant='subtitle2'>{event.paperType}</Typography>
            }
            style={{ flex: "1" }}
            secondary={event.badgeCount + " nos."}
          />
          <ListItemText
            style={{ flex: "1" }}
            primary={
              <Fragment>
                {event.systems.terminal && (
                  <Typography variant='subtitle2'>
                    <Chip
                      size='small'
                      label={`Terminals - ${event.systems.terminal}`}
                      style={{
                        color: "black",
                        margin: "1px",
                        textTransform: "capitalize"
                      }}
                    />
                  </Typography>
                )}
                {event.systems.printer && (
                  <Typography variant='subtitle2'>
                    <Chip
                      size='small'
                      label={`Printers - ${event.systems.printer}`}
                      style={{
                        color: "black",
                        margin: "1px",
                        textTransform: "capitalize"
                      }}
                    />
                  </Typography>
                )}
                {event.systems.kiosk && (
                  <Typography variant='subtitle2'>
                    <Chip
                      size='small'
                      label={`Kiosk - ${event.systems.kiosk}`}
                      style={{
                        color: "black",
                        margin: "1px",
                        textTransform: "capitalize"
                      }}
                    />
                  </Typography>
                )}
              </Fragment>
            }
          />
          <ListItemText
            style={{ flex: "1" }}
            primary={
              <Typography variant='subtitle2'>
                {event.team.map(team => (
                  <Chip
                    size='small'
                    label={team}
                    style={{
                      color: "black",
                      margin: "1px",
                      textTransform: "capitalize"
                    }}
                  />
                ))}
              </Typography>
            }
          />
          {isAdmin && location.pathname === "/admin" && (
            <div>
              <IconButton onClick={handleOpenAlertDialog}>
                <DeleteIcon fontSize='small' color='error' />
              </IconButton>
              <IconButton
                onClick={() => {
                  console.log(event);
                  setFormState(true);
                  setEventId(event.id);
                  setEventName(event.eventName);
                  setSelectStartDate(
                    new Date(event.eventDate.eventStartDate.seconds * 1000)
                  );
                  setSelectEndDate(
                    new Date(event.eventDate.eventEndDate.seconds * 1000)
                  );
                  setOrganizer(event.eventOrganizer);
                  setLocation(event.location);
                  setPaperType(event.paperType);
                  setBadgeCount(event.badgeCount);
                  setTerminal(event.systems.terminal);
                  setPrinter(event.systems.printer);
                  setKiosk(event.systems.kiosk);
                  setOnsiteTeam(event.team);
                  console.log(new Date(event.eventDate.eventStartDate.seconds));
                }}
              >
                <EditIcon fontSize='small' color='primary' />
              </IconButton>
            </div>
          )}
        </ListItem>
      </List>

      <AlertDialog
        openAlertDialog={openAlertDialog}
        handleCloseAlertDialog={handleCloseAlertDialog}
        eventName={event.eventName}
        eventId={event.id}
      />
    </React.Fragment>
  );
};

export default withRouter(ListView);

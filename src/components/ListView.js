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

import firebase from "../firebase";
import AlertDialog from "./ui/AlertDialog";

const ListView = ({ event, width }) => {
  const { isAdmin } = useContext(AuthContext);
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
          {isAdmin && (
            <div>
              <IconButton onClick={handleOpenAlertDialog}>
                <DeleteIcon fontSize='small' />
              </IconButton>
              <IconButton onClick={() => console.log(event.id)}>
                <EditIcon fontSize='small' />
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

export default ListView;

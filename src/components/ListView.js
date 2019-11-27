import React, { Fragment, useContext, useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  IconButton
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
                    Terminals - {event.systems.terminal}
                  </Typography>
                )}
                {event.systems.printer && (
                  <Typography variant='subtitle2'>
                    Printers - {event.systems.printer}
                  </Typography>
                )}
                {event.systems.kiosk && (
                  <Typography variant='subtitle2'>
                    Kiosk - {event.systems.kiosk}
                  </Typography>
                )}
              </Fragment>
            }
          />
          <ListItemText
            style={{ flex: "1" }}
            primary={
              <Fragment>
                {event.team.projectManager && (
                  <Typography
                    variant='subtitle2'
                    style={{ textTransform: "capitalize" }}
                  >
                    {event.team.projectManager}
                  </Typography>
                )}
                {event.team.projectCoordinator && (
                  <Typography
                    variant='subtitle2'
                    style={{ textTransform: "capitalize" }}
                  >
                    {event.team.projectCoordinator}
                  </Typography>
                )}
                {event.team.technical && (
                  <Typography
                    variant='subtitle2'
                    style={{ textTransform: "capitalize" }}
                  >
                    {event.team.technical}
                  </Typography>
                )}
              </Fragment>
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

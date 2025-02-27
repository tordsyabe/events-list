import React from "react";
import Nav from "../layout/Nav";
import SideNav from "../layout/SideNav";
import SideNavContextProvider from "../../contexts/SideNavContext";
import {
  Container,
  Typography,
  Snackbar,
  CircularProgress
} from "@material-ui/core";
import ListView from "../ListView";
import { EventsContext } from "../../contexts/EventsContext";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { AuthContext } from "../../contexts/AuthContext";

import { Redirect } from "react-router-dom";
import { EventFormContext } from "../../contexts/EventFormContext";
import { SnackBarContext } from "../../contexts/SnackBarContext";
import EventForm from "../Forms/EventForm";

import useMediaQuery from "@material-ui/core/useMediaQuery";
import ExpandableView from "../ExpandableView";

import DeleteAlertDialog from "../ui/DeleteAlertDialog";

const Admin = () => {
  const matches = useMediaQuery(theme => theme.breakpoints.up("sm"));
  const { events } = React.useContext(EventsContext);
  const { isAdmin, isAdminAuthen } = React.useContext(AuthContext);
  const { formState, handleFormClose, setFormState } = React.useContext(
    EventFormContext
  );

  const [eventNameToDelete, setEventNameToDelete] = React.useState("");
  const [eventIdToDelete, setEventIdToDelete] = React.useState("");
  const [openAlertDialog, setOpenAlertDialog] = React.useState(false);

  const handleCloseAlertDialog = () => {
    setOpenAlertDialog(false);
  };

  const handleOpenAlertDialog = () => {
    setOpenAlertDialog(true);
  };

  const {
    snackBarState,
    setSnackBarState,
    handleCloseSnackBar
  } = React.useContext(SnackBarContext);

  const { open, vertical, horizontal } = snackBarState;

  if (isAdminAuthen) {
    return (
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  if (isAdmin === null) {
    return <Redirect to='/' />;
  }

  return (
    <div>
      <SideNavContextProvider>
        <Nav />
        <SideNav />
        <Container maxWidth='lg' style={{ marginTop: "2rem" }}>
          <Typography variant='h4' color='inherit'>
            Events List
          </Typography>
          <Fab
            color='secondary'
            aria-label='add'
            style={{
              position: "fixed",
              right: "1.2rem",
              bottom: "1.2rem",
              zIndex: "2"
            }}
            onClick={() => setFormState(true)}
          >
            <AddIcon />
          </Fab>
          <div style={{ marginTop: "2rem" }}>
            {events.map(event =>
              matches ? (
                <ListView
                  key={event.id}
                  event={event}
                  width='100'
                  openAlertDialog={openAlertDialog}
                  setOpenAlertDialog={setOpenAlertDialog}
                  handleCloseAlertDialog={handleCloseAlertDialog}
                  handleOpenAlertDialog={handleOpenAlertDialog}
                  setEventIdToDelete={setEventIdToDelete}
                  setEventNameToDelete={setEventNameToDelete}
                />
              ) : (
                <ExpandableView
                  key={event.id}
                  event={event}
                  openAlertDialog={openAlertDialog}
                  setOpenAlertDialog={setOpenAlertDialog}
                  handleCloseAlertDialog={handleCloseAlertDialog}
                  handleOpenAlertDialog={handleOpenAlertDialog}
                  setEventIdToDelete={setEventIdToDelete}
                  setEventNameToDelete={setEventNameToDelete}
                />
              )
            )}
          </div>
        </Container>
        <EventForm
          formState={formState}
          handleFormClose={handleFormClose}
          setSnackBarState={setSnackBarState}
          snackBarState={snackBarState}
        />

        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          onClose={handleCloseSnackBar}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          style={{ textAlign: "center" }}
          message={<span id='message-id'>Event schedule saved.</span>}
        />
        <DeleteAlertDialog
          openAlertDialog={openAlertDialog}
          handleCloseAlertDialog={handleCloseAlertDialog}
          eventName={eventNameToDelete}
          eventId={eventIdToDelete}
        />
      </SideNavContextProvider>
    </div>
  );
};

export default Admin;

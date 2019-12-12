import React from "react";
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  Typography,
  ExpansionPanelDetails,
  ExpansionPanelActions,
  IconButton
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { AuthContext } from "../contexts/AuthContext";
import { EventFormContext } from "../contexts/EventFormContext";

import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import EditRoundedIcon from "@material-ui/icons/EditRounded";

import { withRouter } from "react-router-dom";

const ExpandableView = ({
  event,
  location,
  openAlertDialog,
  handleCloseAlertDialog,
  handleOpenAlertDialog,
  setEventNameToDelete,
  setEventIdToDelete
}) => {
  const { isAdmin } = React.useContext(AuthContext);
  const {
    setFormState,
    setEventId,
    setSelectStartDate,
    setSelectEndDate,
    setEventName,
    setOrganizer,
    setLocation,
    setPaperType,
    setBadgeCount,
    setTerminal,
    setPrinter,
    setKiosk,
    setOnsiteTeam
  } = React.useContext(EventFormContext);

  return (
    <ExpansionPanel>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls='panel1a-content'
        id='panel1a-header'
      >
        <Typography>
          {event.eventName}
          <br />
          <Typography variant='caption'>
            {event.eventOrganizer}
            <br />
            {event.eventDate.eventDays}
            <br />
            {event.eventDate.eventMonth}
          </Typography>
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Typography>
          {event.location}
          <br />
          {event.paperType}
          <br />
          {event.badgeCount}
        </Typography>
      </ExpansionPanelDetails>
      {isAdmin && location.pathname === "/admin" && (
        <ExpansionPanelActions>
          <IconButton
            onClick={() => {
              handleOpenAlertDialog();
              setEventNameToDelete(event.eventName);
              setEventIdToDelete(event.id);
            }}
          >
            <DeleteRoundedIcon fontSize='small' />
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
            <EditRoundedIcon fontSize='small' />
          </IconButton>
        </ExpansionPanelActions>
      )}
    </ExpansionPanel>
  );
};

export default withRouter(ExpandableView);

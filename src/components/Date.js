import React from "react";
import { Grid, Typography, IconButton } from "@material-ui/core";
import Title from "./Title";
import { AuthContext } from "../contexts/AuthContext";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import EditRoundedIcon from "@material-ui/icons/EditRounded";

const Date = ({ eventDate, eventOrganizer, eventName }) => {
  const { isAdmin } = React.useContext(AuthContext);

  return (
    <Grid
      item
      xs={12}
      sm={12}
      md={3}
      lg={3}
      xl={3}
      style={{
        backgroundColor: "rgb(238, 238, 238)",
        padding: "1rem 1.5rem",
        minWidth: "30%",
        minHeight: "175px",
        position: "relative"
      }}
    >
      <Title eventOrganizer={eventOrganizer} eventName={eventName} />
      <Typography variant='h4'>{eventDate.eventDays}</Typography>
      <Typography variant='subtitle1'>{eventDate.eventMonth}</Typography>
      <br />
    </Grid>
  );
};

export default Date;

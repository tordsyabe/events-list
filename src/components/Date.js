import React from "react";
import { Grid, Typography } from "@material-ui/core";
import Title from "./Title";

const Date = ({ eventDate, eventOrganizer, eventName }) => {
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
        padding: "1rem 2rem",
        minWidth: "30%",
        minHeight: "175px"
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

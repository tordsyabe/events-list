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
        backgroundColor: "rgb(63,81,181)",
        background: `linear-gradient(180deg, rgba(63,81,181,1) 0%, #7c4dff 100%)`,
        padding: "1rem 2rem",
        minWidth: "30%",
        minHeight: "175px"
      }}
    >
      <Title eventOrganizer={eventOrganizer} eventName={eventName} />
      <Typography variant='h4' style={{ color: "#ffffff", fontWeight: "bold" }}>
        {eventDate.eventDays}
      </Typography>
      <Typography
        variant='subtitle1'
        style={{
          color: "#ffffff"
        }}
      >
        {eventDate.eventMonth}
      </Typography>
      <br />
    </Grid>
  );
};

export default Date;

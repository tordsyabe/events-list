import React from "react";
import { Typography } from "@material-ui/core";

const Title = ({ eventName, eventOrganizer }) => {
  return (
    <div style={{ justifySelf: "start", width: "75%" }}>
      <Typography variant='h6'>{eventName}</Typography>
      <Typography variant='subtitle2' style={{ color: "grey" }}>
        {eventOrganizer}
      </Typography>
    </div>
  );
};

export default Title;

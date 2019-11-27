import React from "react";

import { Card, CardContent, Grid } from "@material-ui/core";

import cardStyles from "../App.module.css";

import Date from "../components/Date";
import Location from "../components/Location";
import PaperType from "../components/PaperType";
import Terminal from "../components/Terminal";
import Staff from "../components/Staff";

const CardView = ({ event }) => {
  return (
    <Card className={cardStyles.Card} key={event.id}>
      <CardContent style={{ padding: 0, minHeight: "165px" }}>
        <Grid container direction='row'>
          {/* DATE GRID */}
          <Date
            eventDate={event.eventDate}
            eventOrganizer={event.eventOrganizer}
            eventName={event.eventName}
          />
          {/* LOCATION GRID */}
          <Location location={event.location} />
          {/* PAPERTYPE GRID */}
          <PaperType
            paperType={event.paperType}
            badgeCount={event.badgeCount}
          />
          {/* SYSTEMS/TERMINALS GRID */}
          <Terminal systems={event.systems} />
          {/* STAFFS GRID */}
          <Staff onsiteTeam={event.team} />
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CardView;

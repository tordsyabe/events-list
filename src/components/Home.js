import React, { Fragment, useContext, useState } from "react";

import { Grid, Container } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import ViewDayIcon from "@material-ui/icons/ViewDay";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";

import { EventsContext } from "../contexts/EventsContext";
import CardView from "../components/CardView";
import ListView from "../components/ListView";
import CircularProgress from "@material-ui/core/CircularProgress";
import Nav from "./layout/Nav";
import SideNav from "./layout/SideNav";
import SideNavContextProvider from "../contexts/SideNavContext";

const Home = () => {
  const { events } = useContext(EventsContext);
  const [cardView, setCardView] = useState(true);

  const eventsUI = events.map(event =>
    cardView ? (
      <CardView key={event.id} event={event} />
    ) : (
      <ListView key={event.id} event={event} width='100' />
    )
  );

  return (
    <SideNavContextProvider>
      <Nav />
      <SideNav />
      <Fragment>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <Container maxWidth='lg'>
            <Grid
              container
              alignItems='center'
              justify='space-between'
              style={{ margin: "1rem auto" }}
            >
              <Grid
                item
                xs={12}
                lg={12}
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "flex-end"
                }}
              >
                <IconButton onClick={() => setCardView(false)}>
                  <FormatListBulletedIcon color={cardView ? "" : "secondary"} />
                </IconButton>
                <IconButton onClick={() => setCardView(true)}>
                  <ViewDayIcon color={cardView ? "" : "secondary"} />
                </IconButton>
              </Grid>
            </Grid>
          </Container>
          <Container maxWidth='lg' style={{ marginTop: "2rem" }}>
            {events.length === 0 ? (
              <Grid
                container
                justify='center'
                alignItems='center'
                style={{ height: "100%" }}
              >
                <CircularProgress />
              </Grid>
            ) : (
              eventsUI
            )}
          </Container>
        </div>
      </Fragment>
    </SideNavContextProvider>
  );
};

export default Home;

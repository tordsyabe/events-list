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

import useMediaQuery from "@material-ui/core/useMediaQuery";
import ExpandableView from "./ExpandableView";

const Home = () => {
  const matches = useMediaQuery(theme => theme.breakpoints.up("sm"));

  const { events, searchResults } = useContext(EventsContext);
  const [cardView, setCardView] = useState(true);

  const eventsUI = searchResults.map(event =>
    cardView ? (
      <CardView key={event.id} event={event} />
    ) : matches ? (
      <ListView key={event.id} event={event} width='100' />
    ) : (
      <ExpandableView key={event.id} event={event} />
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
                  <FormatListBulletedIcon
                    style={{ color: cardView ? "" : "#261f1f" }}
                  />
                </IconButton>
                <IconButton onClick={() => setCardView(true)}>
                  <ViewDayIcon style={{ color: !cardView ? "" : "#261f1f" }} />
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

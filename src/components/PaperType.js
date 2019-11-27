import React from "react";

import { Grid, Typography, Chip } from "@material-ui/core";

import paperTypeIcon from "../assets/license.svg";

const PaperType = ({ paperType, badgeCount }) => {
  return (
    <Grid
      item
      xs={4}
      sm={4}
      md={2}
      lg={2}
      xl={2}
      style={{
        padding: "10px",
        margin: "1rem 0",
        borderRight: "1px solid #e0e0e0"
      }}
    >
      <Grid container justify="center">
        <Grid item>
          <img src={paperTypeIcon} width="40px" alt="location" />
        </Grid>
        <Grid item xs={12} style={{ textAlign: "center", marginTop: "1rem" }}>
          <Typography variant="subtitle2">{paperType}</Typography>
          <Chip size="small" label={badgeCount} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default PaperType;

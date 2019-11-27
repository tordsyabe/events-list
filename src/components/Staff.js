import React from "react";

import styles from "../App.module.css";

import { Grid, Typography, Chip } from "@material-ui/core";

const Staff = ({ onsiteTeam }) => {
  return (
    <Grid
      item
      xs={12}
      sm={12}
      md={3}
      lg={3}
      xl={3}
      className={styles.StaffCard}
      style={{
        padding: "1rem",
        textAlign: "center"
      }}
    >
      <Grid container direction='row' justify='center'>
        <Grid item style={{ marginBottom: "0.8rem", textAlign: "center" }}>
          <Typography variant='h6'>Onsite Team</Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography variant='subtitle2'>
            {onsiteTeam.map(team => (
              <Chip
                size='small'
                label={team}
                style={{
                  background: "#3f51b5",
                  color: "#ffffff",
                  margin: "1px",
                  textTransform: "capitalize"
                }}
              />
            ))}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Staff;

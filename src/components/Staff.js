import React from "react";

import styles from "../App.module.css";

import { Grid, Typography, Chip } from "@material-ui/core";

const Staff = ({ staffs }) => {
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
        textAlign: "center",
        background: "#eeeeee"
        // borderRight: "1px solid #eeeeee"
      }}
    >
      <Grid container direction="row" justify="center">
        <Grid item style={{ marginBottom: "0.8rem", textAlign: "center" }}>
          <Typography variant="subtitle1">Onsite Team</Typography>
        </Grid>

        <Grid item xs={12}>
          {staffs.projectManager && (
            <Typography variant="subtitle2">
              Project Manager{" "}
              <Chip
                size="small"
                label={staffs.projectManager}
                style={{
                  background: "#3f51b5",
                  color: "#ffffff",
                  margin: "1px",
                  textTransform: "capitalize"
                }}
              />
            </Typography>
          )}
        </Grid>

        <Grid item xs={12}>
          {staffs.projectCoordinator && (
            <Typography variant="subtitle2">
              Project Coordinator{" "}
              <Chip
                size="small"
                label={staffs.projectCoordinator}
                style={{
                  background: "#673ab7",
                  color: "#ffffff",
                  margin: "1px",
                  textTransform: "capitalize"
                }}
              />
            </Typography>
          )}
        </Grid>

        <Grid item xs={12}>
          {staffs.technical && (
            <Typography variant="subtitle2">
              Technical{" "}
              {staffs.technical.map((tech, i) => (
                <Chip
                  size="small"
                  key={i}
                  label={tech}
                  style={{
                    background: "#212121",
                    color: "#ffffff",
                    margin: "1px",
                    textTransform: "capitalize"
                  }}
                />
              ))}
            </Typography>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Staff;

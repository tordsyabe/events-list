import React from "react";

import { Grid, Typography, Chip } from "@material-ui/core";

import terminalsIcon from "../assets/printer.svg";

const Terminal = ({ systems }) => {
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
        margin: "1rem 0"
      }}
    >
      <Grid container justify='center'>
        <Grid item>
          <img src={terminalsIcon} width='40px' alt='location' />
        </Grid>
        <Grid item xs={12} style={{ textAlign: "center", marginTop: "1rem" }}>
          <Typography variant='subtitle2'>
            Terminals <Chip size='small' label={systems.terminal} />
          </Typography>
          <Typography variant='subtitle2'>
            Printers <Chip size='small' label={systems.printer} />
          </Typography>
          {systems.kiosk && (
            <Typography variant='subtitle2'>
              Kiosk <Chip size='small' label={systems.kiosk} />
            </Typography>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Terminal;

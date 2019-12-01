import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import WarningRoundedIcon from "@material-ui/icons/WarningRounded";
import DialogTitle from "@material-ui/core/DialogTitle";
import firebase from "../../firebase";
import { Grid, Typography } from "@material-ui/core";

export default function AlertDialog(props) {
  return (
    <div>
      <Dialog
        open={props.openAlertDialog}
        onClose={props.handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>
          <Grid container justify='space-between'>
            <Grid item>{props.eventName}</Grid>
            <Grid item>
              <WarningRoundedIcon color='error' />
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            <Typography variant='subtitle2'>
              Are you sure you want to delete this event?
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleCloseAlertDialog} color='primary'>
            Cancel
          </Button>
          <Button
            onClick={e => {
              e.stopPropagation();
              firebase
                .firestore()
                .collection("events")
                .doc(props.eventId)
                .delete()
                .then(() => {
                  console.log("deleted");
                });
            }}
            color='primary'
            autoFocus
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

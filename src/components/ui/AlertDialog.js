import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import firebase from "../../firebase";

export default function AlertDialog(props) {
  return (
    <div>
      <Dialog
        open={props.openAlertDialog}
        onClose={props.handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{props.eventName}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Are you sure you want to delete this event?
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

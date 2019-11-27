import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem
} from "@material-ui/core";

import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";

import firebase from "../../firebase";
import { getMonth } from "../../utils/Utils";
import { getDay } from "../../utils/Utils";
import { getYear } from "../../utils/Utils";

import CircularProgress from "@material-ui/core/CircularProgress";

const EventForm = ({
  formState,
  handleFormClose,
  setSnackBarState,
  snackBarState
}) => {
  const [selectStartDate, setSelectStartDate] = React.useState(new Date());
  const [selectEndDate, setSelectEndDate] = React.useState(new Date());
  const [eventName, setEventName] = React.useState("");
  const [organizer, setOrganizer] = React.useState("");

  const [Location, setLocation] = React.useState("");
  const [paperType, setPaperType] = React.useState("");
  const [badgeCount, setBadgeCount] = React.useState("");
  const [terminal, setTerminal] = React.useState("");
  const [printer, setPrinter] = React.useState("");

  const [kiosk, setKiosk] = React.useState("");
  const [projectManager, setProjectManager] = React.useState("");
  const [projectCoordinator, setProjectCoordinator] = React.useState("");
  const [technical, setTechnical] = React.useState([]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const paperTypes = [
    {
      value: "Paper Type-1",
      label: "Paper Type-1"
    },
    {
      value: "Paper Type-2",
      label: "Paper Type-2"
    },
    {
      value: "Paper Type-3",
      label: "Paper Type-3"
    },
    {
      value: "Thermal Paper",
      label: "Thermal Paper"
    },
    {
      value: "PVC",
      label: "PVC"
    },

    {
      value: "Label Sticker",
      label: "Label Sticker"
    }
  ];

  const handleStartDateChange = date => {
    setSelectStartDate(date);
  };

  const handleEndChange = date => {
    setSelectEndDate(date);
  };

  const handleEventFormSubmit = e => {
    e.preventDefault();

    setIsSubmitting(true);

    const startDate = getDay(selectStartDate);

    const endDate = getDay(selectEndDate);

    const eventMonth = getMonth(selectStartDate);

    const year = getYear(selectStartDate);

    const dateCreated = new Date();

    const eventDays = () => {
      if (startDate === endDate) return startDate;

      return startDate + "-" + endDate;
    };

    firebase
      .firestore()
      .collection("events")
      .add({
        dateCreated,
        eventDate: {
          eventDays: eventDays(),
          eventMonth: eventMonth,
          eventYear: year,
          eventStartDate: firebase.firestore.Timestamp.fromDate(
            selectStartDate
          ),
          eventEndDate: firebase.firestore.Timestamp.fromDate(selectEndDate)
        },
        eventName: eventName,
        eventOrganizer: organizer,
        location: Location,
        paperType: paperType,
        badgeCount: badgeCount,
        systems: {
          terminal: terminal,
          printer: printer,
          kiosk: kiosk
        },
        team: {
          projectManager,
          projectCoordinator,
          technical: technical
        }
      })
      .then(() => {
        setIsSubmitting(false);
        handleFormClose();
        setEventName("");
        setOrganizer("");

        setLocation("");
        setPaperType("");
        setBadgeCount("");
        setTerminal("");
        setPrinter("");

        setKiosk("");
        setProjectManager("");
        setProjectCoordinator("");
        setTechnical("");
      })
      .then(() => setSnackBarState({ ...snackBarState, open: true }));
  };

  return (
    <Dialog
      open={formState}
      onClose={handleFormClose}
      aria-labelledby="form-dialog-title"
      style={{ width: "800px !important" }}
    >
      <DialogTitle id="form-dialog-title">Create an event</DialogTitle>
      <DialogContent>
        <form onSubmit={handleEventFormSubmit}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="start-date"
              label="Event Start Date"
              value={selectStartDate}
              onChange={handleStartDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date"
              }}
            />
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="end-date"
              label="Event End Date"
              value={selectEndDate}
              onChange={handleEndChange}
              KeyboardButtonProps={{
                "aria-label": "change date"
              }}
            />
            <TextField
              required
              id="outlined-basic"
              label="Event Name"
              variant="outlined"
              fullWidth
              margin="dense"
              onChange={e => setEventName(e.target.value)}
            />
            <TextField
              required
              id="outlined-basic"
              label="Organizer"
              variant="outlined"
              fullWidth
              margin="dense"
              onChange={e => setOrganizer(e.target.value)}
            />
            <TextField
              required
              id="outlined-basic"
              label="Location"
              variant="outlined"
              fullWidth
              margin="dense"
              onChange={e => setLocation(e.target.value)}
            />
            <TextField
              required
              id="standard-select-currency"
              select
              label="Select"
              value={paperType}
              helperText="Please select badge type"
              margin="normal"
              fullWidth
              onChange={e => setPaperType(e.target.value)}
            >
              {paperTypes.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              required
              id="outlined-basic"
              label="Badge Count"
              variant="outlined"
              type="number"
              margin="dense"
              onChange={e => setBadgeCount(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Terminals"
              variant="outlined"
              type="number"
              helperText="How many terminals?"
              margin="dense"
              onChange={e => setTerminal(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Printers"
              variant="outlined"
              type="number"
              helperText="How many printers?"
              margin="dense"
              onChange={e => setPrinter(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Kiosk"
              variant="outlined"
              type="number"
              helperText="How many kiosk?"
              margin="dense"
              onChange={e => setKiosk(e.target.value)}
            />
            <TextField
              required
              id="outlined-basic"
              label="Project Manager"
              variant="outlined"
              margin="dense"
              fullWidth
              onChange={e => setProjectManager(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Project Coordinator"
              variant="outlined"
              margin="dense"
              fullWidth
              onChange={e => setProjectCoordinator(e.target.value)}
            />
            <TextField
              required
              id="outlined-basic"
              label="Technical"
              variant="outlined"
              margin="dense"
              fullWidth
              onChange={e => setTechnical([e.target.value])}
            />
          </MuiPickersUtilsProvider>
          <DialogActions>
            <Button onClick={handleFormClose}>Cancel</Button>
            <Button disabled={isSubmitting} type="submit">
              Save
              {isSubmitting && (
                <CircularProgress
                  size="1rem"
                  style={{ position: "absolute" }}
                />
              )}
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EventForm;

import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Grid,
  InputLabel,
  Select,
  Input,
  Chip,
  FormControl
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
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { saveEvent } from "../../services/EventService";
import { EventFormContext } from "../../contexts/EventFormContext";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: "100%",
    maxWidth: "100%"
  },
  chips: {
    display: "flex",
    flexWrap: "wrap"
  },
  chip: {
    margin: 2
  },
  noLabel: {
    marginTop: theme.spacing(3)
  }
}));

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium
  };
}

const EventForm = ({
  formState,
  handleFormClose,
  setSnackBarState,
  snackBarState
}) => {
  const {
    eventId,
    setEventId,
    selectStartDate,
    setSelectStartDate,
    selectEndDate,
    setSelectEndDate,
    eventName,
    setEventName,
    organizer,
    setOrganizer,
    eventLocation,
    setLocation,
    paperType,
    setPaperType,
    badgeCount,
    setBadgeCount,
    terminal,
    setTerminal,
    printer,
    setPrinter,
    kiosk,
    setKiosk,
    onsiteTeam,
    setOnsiteTeam
  } = React.useContext(EventFormContext);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = event => {
    setOnsiteTeam(event.target.value);
  };

  const handleChangeMultiple = event => {
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setOnsiteTeam(value);
  };

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

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250
      }
    }
  };

  const onsiteTeamNames = [
    "Ayah",
    "Sijo",
    "Zulfi",
    "Shahnaz",
    "Jithin",
    "Erwin",
    "Nikhil",
    "Mazin",
    "Hesham",
    "Ken",
    "Adil",
    "Jamal",
    "Hira",
    "Aleeza"
  ];

  const classes = useStyles();
  const theme = useTheme();

  const handleStartDateChange = date => {
    console.log(date);
    setSelectStartDate(date);
  };

  const handleEndChange = date => {
    console.log(date);
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

    saveEvent({
      eventId: eventId,
      dateCreated,
      eventDate: {
        eventDays: eventDays(),
        eventMonth: eventMonth,
        eventYear: year,
        eventStartDate: firebase.firestore.Timestamp.fromDate(selectStartDate),
        eventEndDate: firebase.firestore.Timestamp.fromDate(selectEndDate)
      },
      eventName: eventName,
      eventOrganizer: organizer,
      location: eventLocation,
      paperType: paperType,
      badgeCount: badgeCount,
      systems: {
        terminal: terminal,
        printer: printer,
        kiosk: kiosk
      },
      team: onsiteTeam
    })
      .then(() => {
        setIsSubmitting(false);

        handleFormClose();
        setSelectEndDate(new Date());
        setSelectStartDate(new Date());
        setEventName("");
        setOrganizer("");

        setLocation("");
        setPaperType("");
        setBadgeCount("");
        setTerminal("");
        setPrinter("");

        setKiosk("");
        setOnsiteTeam([]);
      })
      .then(() => setSnackBarState({ ...snackBarState, open: true }));
  };

  return (
    <Dialog
      open={formState}
      onClose={handleFormClose}
      aria-labelledby='form-dialog-title'
      style={{ width: "800px !important" }}
    >
      <DialogTitle id='form-dialog-title'>
        {eventId === "" ? "Create an event" : `Update this event`}
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleEventFormSubmit}>
          <Grid container>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid item xs={12} sm={6}>
                <KeyboardDatePicker
                  disableToolbar
                  autoOk
                  variant='inline'
                  format='MM/dd/yyyy'
                  margin='normal'
                  id='start-date'
                  label='Event Start Date'
                  value={selectStartDate}
                  onChange={handleStartDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date"
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <KeyboardDatePicker
                  disableToolbar
                  autoOk
                  variant='inline'
                  format='MM/dd/yyyy'
                  margin='normal'
                  id='end-date'
                  label='Event End Date'
                  value={selectEndDate}
                  onChange={handleEndChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date"
                  }}
                />
              </Grid>
            </MuiPickersUtilsProvider>

            <TextField
              required
              id='outlined-basic'
              label='Event Name'
              variant='outlined'
              fullWidth
              margin='dense'
              onChange={e => setEventName(e.target.value)}
              value={eventName}
            />
            <TextField
              required
              id='outlined-basic'
              label='Organizer'
              variant='outlined'
              fullWidth
              margin='dense'
              onChange={e => setOrganizer(e.target.value)}
              value={organizer}
            />
            <TextField
              required
              id='outlined-basic'
              label='Location'
              variant='outlined'
              fullWidth
              margin='dense'
              onChange={e => setLocation(e.target.value)}
              value={eventLocation}
            />
            <TextField
              required
              id='standard-select-badge'
              select
              label='Select'
              value={paperType}
              helperText='Please select badge type'
              margin='normal'
              fullWidth
              onChange={e => setPaperType(e.target.value)}
            >
              {paperTypes.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id='outlined-basic'
                label='Badge Count'
                variant='outlined'
                helperText='How many badges?'
                type='number'
                margin='dense'
                onChange={e => setBadgeCount(e.target.value)}
                value={badgeCount}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id='outlined-basic'
                label='Terminals'
                variant='outlined'
                type='number'
                helperText='How many terminals?'
                margin='dense'
                onChange={e => setTerminal(e.target.value)}
                value={terminal}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id='outlined-basic'
                label='Printers'
                variant='outlined'
                type='number'
                helperText='How many printers?'
                margin='dense'
                onChange={e => setPrinter(e.target.value)}
                value={printer}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id='outlined-basic'
                label='Kiosk'
                variant='outlined'
                type='number'
                helperText='How many kiosk?'
                margin='dense'
                onChange={e => setKiosk(e.target.value)}
                value={kiosk}
              />
            </Grid>

            <FormControl className={classes.formControl}>
              <InputLabel id='demo-mutiple-chip-label'>Onsite Team</InputLabel>
              <Select
                labelId='demo-mutiple-chip-label'
                id='demo-mutiple-chip'
                multiple
                value={onsiteTeam}
                onChange={handleChange}
                input={<Input id='select-multiple-chip' />}
                renderValue={selected => (
                  <div className={classes.chips}>
                    {selected.map(value => (
                      <Chip
                        key={value}
                        label={value}
                        className={classes.chip}
                      />
                    ))}
                  </div>
                )}
                MenuProps={MenuProps}
              >
                {onsiteTeamNames.map(name => (
                  <MenuItem
                    key={name}
                    value={name}
                    style={getStyles(name, onsiteTeam, theme)}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <DialogActions>
            <Button onClick={handleFormClose} color='primary'>
              Cancel
            </Button>
            <Button disabled={isSubmitting} type='submit' color='primary'>
              Save
              {isSubmitting && (
                <CircularProgress
                  size='1rem'
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

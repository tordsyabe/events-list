import React, { useState, useContext } from "react";
import { useHistory, Redirect } from "react-router-dom";

import {
  Container,
  CssBaseline,
  Avatar,
  Typography,
  TextField,
  Button,
  Snackbar,
  CircularProgress
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

import { AuthContext } from "../../contexts/AuthContext";

import firebase from "../../firebase";

const Login = props => {
  let history = useHistory();
  const { currentUser, isAdminAuthen, isAdmin } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [snackBarState, setSnackBarState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center"
  });

  const handleCloseSnackBar = () => {
    setSnackBarState({ ...snackBarState, open: false });
  };

  const signInUser = e => {
    e.preventDefault();

    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(function() {
        return firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then(() => {
            history.push("/admin");
          })
          .catch(() => setSnackBarState({ ...snackBarState, open: true }));
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  const { open, vertical, horizontal } = snackBarState;

  return !currentUser ? (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div
        style={{
          marginTop: "5rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "1rem"
        }}
      >
        <Avatar style={{ background: "blue", transition: "all 100ms" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        <form
          style={{ marginTop: "1rem", width: "100%" }}
          onSubmit={signInUser}
        >
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            type='email'
            autoFocus
            onChange={e => setEmail(e.currentTarget.value)}
            value={email}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
            onChange={e => setPassword(e.currentTarget.value)}
            value={password}
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            size='large'
            style={{ marginTop: "2rem" }}
          >
            Sign In
          </Button>
        </form>
      </div>

      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleCloseSnackBar}
        ContentProps={{
          "aria-describedby": "message-id"
        }}
        style={{ display: "flex" }}
        message={<span id='message-id'>Invalid username and password.</span>}
      />
    </Container>
  ) : (
    <Redirect to={{ pathname: "/admin" }} />
  );
};

export default Login;

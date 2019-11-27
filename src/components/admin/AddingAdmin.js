import React from "react";
import { TextField, Button } from "@material-ui/core";
import firebase from "../../firebase";
const AddingAdmin = () => {
  const [email, setEmail] = React.useState("");

  const makeAdmin = e => {
    e.preventDefault();
    const addAdminRole = firebase.functions().httpsCallable("addAdminRole");
    addAdminRole({ email }).then(result => console.log(result));
    console.log(email);
  };

  return (
    <div>
      <TextField onChange={e => setEmail(e.target.value)} />
      <Button onClick={makeAdmin}>Make Admin</Button>
    </div>
  );
};

export default AddingAdmin;

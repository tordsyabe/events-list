import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Icon from "@material-ui/core/Icon";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles(theme => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 400
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1
  },
  iconButton: {
    padding: 10
  },
  divider: {
    height: 28,
    margin: 4
  }
}));

const Search = () => {
  const classes = useStyles();

  const [searchKey, setSearchKey] = useState("");

  return (
    <Paper component='form' className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder='Search'
        onChange={e => {
          setSearchKey(e.target.value);
          console.log(searchKey);
        }}
      />
      <Icon type='submit' className={classes.iconButton} aria-label='search'>
        <SearchIcon />
      </Icon>
    </Paper>
  );
};

export default Search;

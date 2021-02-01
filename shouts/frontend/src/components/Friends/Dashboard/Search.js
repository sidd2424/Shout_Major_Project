import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "100%",
      color: "white",
    },
  },
  margin_div: {
    marginLeft: "0px",
    backgroundColor: "white",
    borderRadius: "5px",
    marginBottom: "3rem",
  },
  input_width: {
    width: "100%",
  },
  color_white: {
    color: "white",
  },
}));

function Search(props) {
  const searchText = (e) => {
    props.dispatch({
      type: "SearchReducer",
      payload: e.target.value,
    });
  };

  const classes = useStyles();
  return (
    <div>
      <form className={classes.root} noValidate autoComplete="off">
        <div className={classes.margin_div}>
          <TextField
            id="outlined-basic"
            className={classes.input_width}
            label="Search Friend"
            variant="outlined"
            onChange={searchText}
          />
        </div>
      </form>
    </div>
  );
}

const mapStoreToProps = (state) => {
  return {
    search: state.search.search,
    searchType: state.search.search,
  };
};

export default connect(mapStoreToProps)(Search);

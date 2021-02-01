import React, { useEffect, useRef, useState } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Container, makeStyles } from "@material-ui/core";
import { connect } from "react-redux";
import axios from "axios";
import Shoutyy from "./Shoutyy";
import CreateShouts from "./CreateShouts";
import { getMyPost } from "../../actions/PostActions";
import Header1 from "../Header/Navbar";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  paper_grid: {
    padding: theme.spacing(2),
    textAlign: "left",
    backgroundColor: "#f1f2f5",
    // borderRadius: "15px",
  },
  feed: {
    flex: 1,
    padding: "30px 150px",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f1f2f5",
  },
  feedBackground: {
    backgroundColor: "#f1f2f5",
  },
}));
function MyShouts(props) {
  const classes = useStyles();
  var user_id = props.user.user_id;

  useEffect(() => {
    // ==============Get Shouts======================
    getMyPost(props, user_id);
  }, []);

  const searchedArray = props.shouts.filter(
    (shout) =>
      shout.title.toLowerCase().includes(props.postSearch.toLowerCase()) ||
      shout.date_posted.toLowerCase().includes(props.postSearch.toLowerCase())
  );

  return (
    <>
      <Header1 />

      {/* ==============Create Shouts====================== */}
      <Grid container spacing={2} justify="center" alignItems="center">
        <CreateShouts />
      </Grid>
      <Grid item sm>
        <Paper className={classes.feedBackground}>
          {/* ==============Display Shouts====================== */}
          {searchedArray.map((shout) => (
            // <Shoutyy key={shout.post_id} shouts={shout} />
            <Shoutyy key={shout.post_id} shouts={shout} myshouts={true} />
          ))}
        </Paper>
      </Grid>
    </>
  );
}
const mapStateToProps = (state) => ({
  shouts: state.shouts,
  user: state.login,
  postSearch: state.postSearch,
});
export default connect(mapStateToProps)(MyShouts);

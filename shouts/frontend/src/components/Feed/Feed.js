import { makeStyles } from "@material-ui/core";
import React, { useState, useEffect } from "react";

import Shoutyy from "./Shoutyy";
import CreateShouts from "./CreateShouts";
import { connect } from "react-redux";
import { getPosts } from "../../actions/PostActions";
import { profiledata, friendlistdata } from "../Services/FriendService";
import { Grid, Paper } from "@material-ui/core";
import Navbar from "../Header/Navbar";
import { getReports } from "../Services/ReportService";
import { getComments } from "../Services/CommentServices";

const useStyles = makeStyles({
  feed: {
    flex: 1,
    padding: "30px 150px",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  feedBackground: {
    backgroundColor: "#f1f5f2",
  },
});
function Feed(props) {
  const classes = useStyles();

  useEffect(() => {
    profiledata(props);
    friendlistdata(props);
    getComments(props);
    // ==============Get Shouts======================
    getPosts(props);
    getReports(props);
  }, []);

  const filteredArray = [];
  function filteredFeed() {
    for (let shout of props.shouts) {
      if (shout.username === props.user.username) {
        filteredArray.push(shout);
      }
      for (let friend of props.friendList) {
        if (
          shout.username === friend.sender &&
          friend.sender !== props.user.username
        ) {
          filteredArray.push(shout);
        }
        if (
          shout.username === friend.receiver &&
          friend.receiver !== props.user.username
        ) {
          filteredArray.push(shout);
        }
      }
    }
  }
  filteredFeed();

  const searchedArray = filteredArray.filter(
    (shout) =>
      shout.username.toLowerCase().includes(props.postSearch.toLowerCase()) ||
      shout.title.toLowerCase().includes(props.postSearch.toLowerCase()) ||
      shout.date_posted.toLowerCase().includes(props.postSearch.toLowerCase())
  );

  return (
    <>
      <Navbar />

      <Grid
        container
        spacing={2}
        alignItems="center"
        justifycontent="center"
        className={classes.feedBackground}
      >
        {/*==============Create Shouts====================== */}

        <CreateShouts />
      </Grid>
      {/* <Grid item sm className={classes.feedBackground}> */}
      <Grid
        container
        spacing={2}
        alignItems="center"
        justifycontent="center"
        className={classes.feedBackground}
      >
        {/*==============Display Shouts====================== */}
        {searchedArray.map((shout) => (
          // <Shout key={shout.post_id} shouts={shout} />
          <Shoutyy key={shout.post_id} shouts={shout} myshouts={false} />
        ))}
      </Grid>
    </>
  );
}
const mapStateToProps = (state) => ({
  shouts: state.shouts,
  user: state.login,

  profiles: state.friendList.profiles,
  postSearch: state.postSearch,
  friendList: state.friendList.friendList,
  reports: state.report.report,
  comments: state.Comment.comments,
});
export default connect(mapStateToProps)(Feed);

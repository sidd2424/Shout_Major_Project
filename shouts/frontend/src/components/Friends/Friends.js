import React from "react";
import { Route, Switch } from "react-router-dom";
import FriendList from "./FriendList/FriendList";
import RequestSent from "./Sent/RequestSent";
import RequestReceived from "./Received/RequestReceived";
import Dashboard from "./Dashboard/Dashboard";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import useStyles from "./UseStyles";
import { makeStyles } from "@material-ui/core/styles";
import Header1 from "../Header/Navbar";

const dashStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: "100vh",
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.primary,
    paddingTop: "2rem",
    paddingBottom: "2rem",

    "@media (max-width : 600px)": {
      height: "60vh",
    },
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  cardFlex: {
    display: "flex",
    fontSize: 24,
  },
}));

const Friends = () => {
  const classes = useStyles();
  const dashstyle = dashStyles();
  return (
    <div>
      <Header1 />
      <div className={classes.root}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Paper
              className={dashstyle.paper}
              style={{ backgroundColor: "#3f51b5" }}
            >
              <Dashboard />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Paper className={dashstyle.paper}>
              <Switch>
                <Route path="/dashboard/friendlist">
                  <FriendList />
                </Route>
                <Route path="/dashboard/requestsent">
                  <RequestSent />
                </Route>
                <Route path="/dashboard/requestreceived">
                  <RequestReceived />
                </Route>
              </Switch>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Friends;

import React, { Component } from "react";
import { render } from "react-dom";
import Login from "./login";
import Register from "./register";
import MyShouts from "./Feed/MyShouts";

import UpdateProfile from "./updateProfile";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import store from "../store/store";
import { Provider } from "react-redux";
import Friends from "./Friends/Friends";
import { Grid, makeStyles, Paper } from "@material-ui/core";
import Feed from "./Feed/Feed";
import PrivateRoute from "./PrivateRoute";
import Navbar from "./Header/Navbar";
import Page404 from "./Error/Page404";
import ErrorBoundary from "./Error/ErrorBoundary";

const useStyles = makeStyles({
  App: {
    backgroundColor: "#f1f2f5",
  },
  app__body: {
    backgroundColor: "#f1f2f5",
  },
});
function App() {
  const classes = useStyles();

  return (
    <ErrorBoundary>
      <Provider store={store}>
        <div className={classes.app__body}>
          <BrowserRouter basename="/app">
            <Switch>
              <PrivateRoute exact path="/" component={Feed} />
              <PrivateRoute path="/mypost" component={MyShouts} />
              <PrivateRoute path="/dashboard" component={Friends} />
              <PrivateRoute path="/updateProfile" component={UpdateProfile} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route component={Page404} />
            </Switch>
          </BrowserRouter>
        </div>
      </Provider>
    </ErrorBoundary>
  );
}

export default App;

const container = document.getElementById("app");
render(<App />, container || document.createElement("div"));

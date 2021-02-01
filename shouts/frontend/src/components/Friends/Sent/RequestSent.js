import React, { useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import useStyles from "../UseStyles";
import Search from "../Dashboard/Search";
import { newfrienddata } from "../../Services/FriendService";

function RequestSent(props) {
  const classes = useStyles();
  const pk = props.user.user_id;
  const authToken = props.user.token;

  const sendRequest = (receiver) => {
    const data1 = {
      receiver: receiver,
    };

    axios
      .post(`/api/friendlist/${pk}`, data1, {
        headers: {
          Authorization: `Token ${authToken}`,
        },
      })
      .then((res) => newfrienddata(props))
      .catch((err) => console.log(err));
  };

  const searchedArray = props.requestSent.filter(
    (item) =>
      item.username.toLowerCase().includes(props.search.toLowerCase()) &&
      item.username !== "admin"
  );

  return (
    <div className={classes.root}>
      <Search />
      <Grid>
        {searchedArray.map((data, item) => {
          return (
            <Grid container spacing={3} key={item}>
              {/* Chnage the name=shubham dynamically using state */}
              {data.username === props.user.username ? null : (
                <Grid item xs={12}>
                  <Paper className={classes.paper}>
                    <div className={classes.cardFlex}>
                      <Avatar
                        alt="Remy Sharp"
                        src={data.user_image}
                        className={classes.large}
                      ></Avatar>
                      <Box m="auto" ml="1rem">
                        {data.username.toUpperCase()}
                      </Box>
                      <IconButton
                        aria-label="accept"
                        color="primary"
                        onClick={() => sendRequest(data)}
                      >
                        <AddCircleIcon />
                      </IconButton>
                    </div>
                  </Paper>
                </Grid>
              )}
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}

const mapStoreToProps = (state) => {
  return {
    requestSent: state.requestSent.requestSent,
    user: state.login,
    search: state.search.search,
  };
};

export default connect(mapStoreToProps)(RequestSent);

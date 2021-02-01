import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import useStyles from "../UseStyles";
import { friendlistdata, newfrienddata } from "../../Services/FriendService";
import Search from "../Dashboard/Search";

function FriendList(props) {
  const classes = useStyles();
  const authToken = props.user.token;

  const unfriendRequest = (data) => {
    axios
      .patch(`/api/friendlist/${data.user_id}`, data, {
        headers: {
          Authorization: `Token ${authToken}`,
        },
      })
      .then((res) => {
        friendlistdata(props);
        newfrienddata(props);
      })
      .catch((error) => console.log(error));
  };

  const searchedArray = props.friendList.filter((item) => {
    if (props.user.username === item.receiver) {
      return item.sender.toLowerCase().includes(props.search.toLowerCase());
    } else
      return item.receiver.toLowerCase().includes(props.search.toLowerCase());
  });

  const senderprofilepic = (data) => {
    for (let item1 of props.profiles) {
      if (item1.username === data.sender) {
        return item1.user_image.slice(21);
      }
    }
  };
  const receiverprofilepic = (data) => {
    for (let item1 of props.profiles) {
      if (item1.username === data.receiver) {
        return item1.user_image.slice(21);
      }
    }
  };

  return (
    <div className={classes.root}>
      <Search />
      <Grid>
        {searchedArray.map((data, item) => {
          return (
            <Grid container spacing={3} key={item}>
              {data.receiver === props.user.username ? (
                <Grid item xs={12}>
                  <Paper className={classes.paper}>
                    <div className={classes.cardFlex}>
                      <Avatar
                        alt="Remy Sharp"
                        src={senderprofilepic(data)}
                        className={classes.large}
                      ></Avatar>
                      <Box m="auto" ml="1rem">
                        {data.sender.toUpperCase()}
                      </Box>
                      <IconButton
                        aria-label="delete"
                        color="secondary"
                        onClick={() => unfriendRequest(data)}
                      >
                        <RemoveCircleIcon />
                      </IconButton>
                    </div>
                  </Paper>
                </Grid>
              ) : (
                <Grid item xs={12}>
                  <Paper className={classes.paper}>
                    <div className={classes.cardFlex}>
                      <Avatar
                        alt="Remy Sharp"
                        src={receiverprofilepic(data)}
                        className={classes.large}
                      ></Avatar>
                      <Box m="auto" ml="1rem">
                        {data.receiver.toUpperCase()}
                      </Box>
                      <IconButton
                        aria-label="delete"
                        color="secondary"
                        onClick={() => unfriendRequest(data)}
                      >
                        <RemoveCircleIcon />
                      </IconButton>
                    </div>
                  </Paper>
                </Grid>
              )}
            </Grid>
          );
        })}
        {/* <ToastContainer /> */}
      </Grid>
    </div>
  );
}

const mapStoreToProps = (state) => {
  return {
    friendList: state.friendList.friendList,
    user: state.login,
    searchType: state.search.searchType,
    search: state.search.search,
    profiles: state.friendList.profiles,
  };
};

export default connect(mapStoreToProps)(FriendList);

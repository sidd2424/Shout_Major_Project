import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchComments } from "../../actions/comment_action";
import axios from "axios";
import { FETCH_COMMENTS } from "../../actions/action_types";
import CommentForm from "../ShowComment/comment_Form";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import Cookies from "js-cookie";
import Avatar from "@material-ui/core/Avatar";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import { getComments } from "../Services/CommentServices";
//----------------------------------------------------

const useStyles = makeStyles((theme) => ({
  table: {
    color: "black",
    padding: "1rem 0",
    marginBottom: "1.5rem",
    borderBottom: "white solid",
    textAlign: "left",
  },
  large: {
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
  uname: {
    fontSize: "1.2rem",
  },
}));

const commentList = (props) => {
  const classes = useStyles();
  const authToken = props.user.token;
  const csrftoken = Cookies.get("csrftoken");
  const Remove = (id) => {
    axios({
      method: "DELETE",
      url: `http://localhost:8000/api/shoutcomment/${id}`,
      headers: {
        "X-CSRFToken": csrftoken,
        Authorization: `Token ${authToken}`,
      },
    }).then((res) => getComments(props));
  };

  let fil = props.comments.filter((c) => c.shout_id === props.shouts.post_id);

  const filterdeletedata = (item) => {
    if (props.shouts.username === props.user.username) {
      return (
        <td>
          <IconButton
            aria-label="delete"
            color="secondary"
            onClick={() => Remove(item.id)}
          >
            <DeleteIcon />
          </IconButton>
        </td>
      );
    }
    if (item.user_id === props.user.user_id) {
      return (
        <td>
          <IconButton
            aria-label="delete"
            color="secondary"
            onClick={() => Remove(item.id)}
          >
            <DeleteIcon />
          </IconButton>
        </td>
      );
    }
  };

  const userdetails = (item) => {
    for (let profile of props.profiles) {
      if (profile.user_id === item.user_id) {
        return (
          <Avatar
            alt="Brian Adams"
            src={profile.user_image.slice(21)}
            className={classes.large}
          ></Avatar>
        );
      }
    }
  };

  const getUserName = (item) => {
    for (let profile of props.profiles) {
      if (profile.user_id === item.user_id) {
        return <span>{profile.username}</span>;
      }
    }
  };

  return (
    <>
      <div>
        <table className={classes.table}>
          <tbody>
            {fil.map((item, k) => (
             
              //----------------------------------------------------------------
              <React.Fragment key={k}>
                <tr>
                  <td>{userdetails(item)}</td>
                  <td colSpan="2">
                    &nbsp;<b className={classes.uname}>{getUserName(item)}</b>
                    &nbsp;&nbsp;&nbsp;
                    {item.date.substring(0, 10)}&nbsp;&nbsp;
                    {item.date.substring(11, 19)}
                  </td>
                  <td style={{ marginRight: 2 + "em" }}>
                    {filterdeletedata(item)}
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td colSpan="3">{item.comment}</td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
          <tfoot></tfoot>
        </table>
        <CommentForm shouts={props.shouts} />
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.login,
    like: state.like.like,
    profiles: state.friendList.profiles,
    reports: state.report.report,
    comments: state.Comment.comments,
  };
};

const List = connect(mapStateToProps)(commentList);
export default List;

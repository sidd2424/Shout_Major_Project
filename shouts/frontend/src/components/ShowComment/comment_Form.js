import React, { useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import Cookies from "js-cookie";
import { getComments } from "../Services/CommentServices";
import SendIcon from "@material-ui/icons/Send";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  table: {
    textAlign: "center",
    marginTop: "20px",
    width: "80%",
    margin: "7%",
  },
}));

function CommentForm(props) {
  const csrftoken = Cookies.get("csrftoken");
  const [postComment, setPostComment] = useState("");
  const authToken = props.user.token;
  const classes = useStyles();
  const handleSubmit = (event) => {
    event.preventDefault();
    axios({
      method: "POST",
      url: "http://localhost:8000/api/shoutcomment/",
      headers: {
        "X-CSRFToken": csrftoken,
        Authorization: `Token ${authToken}`,
      },
      data: {
        shout_id: props.shouts.post_id,
        user_id: props.user.user_id,
        comment: postComment,
      },
    }).then((res) => getComments(props));
  };

  const handleChange = (event) => {
    setPostComment(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <table className={classes.table}>
        <tbody>
          <tr>
            <td>
              <label htmlFor="comment">
                <strong>Type here:</strong>
              </label>
            </td>
            <td>
              <textarea
                type="text"
                className="form-control"
                id="comment"
                value={postComment}
                onChange={handleChange}
              />
            </td>
            <td>
              <IconButton
                type="submit"
                className="btn btn-success btn-lg mt-2"
                color="primary"
              >
                <SendIcon></SendIcon>
              </IconButton>
            </td>
          </tr>
        </tbody>
        <tfoot></tfoot>
      </table>
    </form>
  );
}
const mapStateToProps = (state) => {
  return {
    user: state.login,
    like: state.like.like,
    profiles: state.friendList.profiles,
    reports: state.report.report,
    comments: state.Comment.comments,
  };
};

export default connect(mapStateToProps)(CommentForm);

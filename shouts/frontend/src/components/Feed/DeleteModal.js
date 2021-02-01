import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";

import axios from "axios";
import Cookies from "js-cookie";
import { getPosts } from "../../actions/PostActions";
import { deletePost, deleteMyPost } from "../../actions/PostActions";
const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    top: "calc(50% - 9rem)",
    left: "calc(50% - 13rem)",
    width: "80vmin",
    borderRadius: "15px",
    backgroundColor: "white",
    outline: 0,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  h3: {
    fontSize: "20px",
    color: "#000",
    marginBottom: "1rem",
    paddingBottom: "1rem",
    borderBottom: "1px solid #000",
  },
  cancel: {
    marginRight: "5px",
  },
  btnDiv: {
    textAlign: "end",
  },
  span: {
    fontWeight: "bold",
  },
  delete: {
    marginRight: "5px",
  },
}));

function DeleteModal(props) {
  
  const classes = useStyles();
  const csrftoken = Cookies.get("csrftoken");

  const cancelDelete = () => {
    props.handleClose();
  };

  const onDeleteClicked = () => {
    if (props.myshout) {
      deleteMyPost(props);
    } else {
      deletePost(props);
    }

    props.handleClose();
  };

  return (
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={props.open}
      onClose={props.handleClose}
    >
      <div className={classes.paper}>
        <h3 className={classes.h3}>
          Are you sure you want to delete "
          <span className={classes.span}>{props.postTitle}</span>" post
        </h3>
        <div className={classes.btnDiv}>
          <Button
            className={classes.cancel}
            onClick={cancelDelete}
            variant="contained"
          >
            Cancel
          </Button>
          <Button
            className={classes.delete}
            variant="contained"
            color="secondary"
            onClick={() => onDeleteClicked(props.postId)}
          >
            Yes
          </Button>
        </div>
      </div>
    </Modal>
  );
}
const mapStateToProps = (state) => ({
  shouts: state.shouts,
  user: state.login,
});
export default connect(mapStateToProps)(DeleteModal);

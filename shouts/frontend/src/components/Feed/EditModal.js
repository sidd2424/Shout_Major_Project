import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Modal } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";
import Cookies from "js-cookie";

import { updatePost, updateMyPost } from "../../actions/PostActions";

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
    color: "#ccc",
  },
  h2: {
    color: "#102016",
    padding: "1rem 0",
    marginBottom: "1.5rem",
    borderBottom: "white solid",
    textAlign: "center",
  },
  button: {
    margin: theme.spacing(1),
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
  cancel: {
    marginRight: "5px",
  },
  btnDiv: {
    textAlign: "end",
  },
}));

function EditModal(props) {
  const classes = useStyles();
  const [title, setTitle] = useState(props.title);
  const [description, setDescription] = useState(props.description);
  const [media, setMedia] = useState(props.media);
  const [post_type, setPostType] = useState(props.post_type);
  var imageInputRef = React.useRef();
  const csrftoken = Cookies.get("csrftoken");
  const uploadData = new FormData();

  // change the state each time the component rerender
  useEffect(() => {
    setTitle(props.postTitle);
    setDescription(props.postContent);
    setMedia(props.media);

    setPostType(props.post_type);
  }, [props.postTitle, props.postContent, props.post_type, props.media]);
  var mediaType = "";
  if (props.post_type === "A") mediaType = "audio/*";
  else if (props.post_type === "V") mediaType = "video/*";
  else mediaType = "image/*";

  const onFormSubmit = (e) => {
    e.preventDefault();

    uploadData.append("title", title);
    {
      props.post_type === "T"
        ? uploadData.append("description", description)
        : uploadData.append("media", media);
    }

    if (props.myshout) {
      updateMyPost(props, uploadData);
    } else {
      updatePost(props, uploadData);
    }

    props.handleClose();
  };

  const onCloseModal = () => {
    props.handleClose();
  };

  return (
    <div>
      <Modal
        aria-labelledby="title"
        aria-describedby="description"
        open={props.open}
        onClose={props.onCloseModal}
      >
        <div className={classes.paper}>
          <h2 className={classes.h2} id="title">
            Update Post
          </h2>
          <form id="description" onSubmit={onFormSubmit}>
            <TextField
              required
              label="Title"
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              name="title"
              fullWidth={true}
            />

            {props.post_type === "T" ? (
              <TextField
                required
                name="description"
                label="description"
                multiline={true}
                rowsMax="4"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                margin="normal"
                fullWidth={true}
              />
            ) : (
              <div>
                <span>Upload Image</span>
                <input
                  required
                  accept={mediaType}
                  type="file"
                  onChange={(e) => setMedia(e.target.files[0])}
                />
              </div>
            )}

            <div className={classes.btnDiv}>
              <Button
                className={classes.cancel}
                onClick={onCloseModal}
                variant="contained"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.button}
              >
                Update
                <Icon className={classes.rightIcon}></Icon>
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}
const mapStateToProps = (state) => ({
  shouts: state.shouts,
  user: state.login,
});
export default connect(mapStateToProps)(EditModal);

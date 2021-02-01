import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Avatar, Button, makeStyles } from "@material-ui/core";

import SendIcon from "@material-ui/icons/Send";
import IconButton from "@material-ui/core/IconButton";
import VideocamIcon from "@material-ui/icons/Videocam";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import AudiotrackIcon from "@material-ui/icons/Audiotrack";
import TextField from "@material-ui/core/TextField";
import Modal from "@material-ui/core/Modal";
import Cookies from "js-cookie";
import dateFormat from "dateformat";
import axios from "axios";
import { shadows } from "@material-ui/system";
import { connect } from "react-redux";
import { createPost } from "../../actions/PostActions";

const useStyles = makeStyles((theme) => ({
  shadows: ["none"],
  root: {
    flexGrow: 1,
    marginTop: "70px",
    marginLeft: "20px",
  },
  paper_grid: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    borderRadius: "15px",
    width: "50%",
    marginLeft: "25%",
    "@media (max-width: 500px)": {
      width: "70%",
      marginLeft: "10%",
    },
  },
  create__card: {
    display: "flex",
    marginTop: "30px",
    flexDirection: "column",
    backgroundColor: "white",
    borderRadius: "15px",
    boxShadow: "0px 5px 7px -7px rgba(0,0,0,0.75)",
    width: "100%",
    "@media (max-width: 900px)": {
      width: "70%",
    },
  },
  create__top: {
    display: "flex",
    borderBottom: "1px solid #eff2f5",
    padding: "15px",
    justifyContent: "flex-start",
    width: "100%",
    "@media (max-width: 900px)": {
      width: "70%",
      "& input": {
        width: "100%",
        padding: "5px",
      },
    },
    "& form": {
      flex: 1,
      display: "flex",
      justifyContent: "flex-start",
      "& input": {
        outlineWidth: 0,
        border: "none",
        padding: "5px 20px",
        margin: "0 10px",
        borderRadius: "999px",
        backgroundColor: "#eff2f5",
        width: "100%",
      },
    },
  },
  create__bottom: {
    display: "flex",
    justifyContent: "space-evenly",
  },
  create__option: {
    padding: "20px",
    display: "flex",
    alignItems: "center",
    color: "gray",
    margin: "5px",
    "@media (max-width: 900px)": {
      margin: "2px",
      padding: "10px",
    },
    "& h3": {
      fontSize: "medium",
      marginLeft: "10px",
      "@media (max-width: 900px)": {
        fontSize: "small",
        marginLeft: "5px",
      },
    },
    "&:hover": {
      backgroundColor: "#eff2f5",
      cursor: "pointer",
    },
  },
  textModalContainer: {
    width: "500px",
    position: "relative",
    display: "flex",
    height: "300px",
    flexDirection: "column",
  },

  "MuiPaper-elevation1": {
    boxShadow: "none",
  },
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    borderRadius: "15px",
    boxShadow: "0px 5px 7px -7px rgba(0,0,0,0.75)",

    padding: theme.spacing(2, 4, 3),
    outline: 0,
  },
  paperModal: {
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
    color: "black",
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
function rand() {
  return Math.round(Math.random() * 20) - 10;
}
function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
function CreateShouts(props) {
  const classes = useStyles();
  var usernameDis = sessionStorage.getItem("user");
  var i = usernameDis.indexOf(" ");
  var user = usernameDis.substr(0, i);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [media, setMedia] = useState("");
  const [post_type, setPostType] = useState("T");
  const [modalStyle] = useState(getModalStyle);
  const [openText, setOpenText] = useState(false);
  const [username, setUserName] = useState(props.user.user_id);
  var date = new Date();

  var post_date = dateFormat(date, "yyyy-mm-dd HH:MM");
  const profilepic = () => {
    for (let item1 of props.profiles) {
      if (item1.username === usernameDis) {
        return item1.user_image.slice(21);
      }
    }
  };
  // ==========================Text Modal Controls======================================

  const handleOpen = () => {
    setOpenText(true);
  };
  const handleClose = () => {
    setOpenText(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const uploadData = new FormData();
    uploadData.append("title", title);
    uploadData.append("post_type", post_type);
    uploadData.append("description", description);
    uploadData.append("date_posted", post_date);
    uploadData.append("username", props.user.user_id);
    uploadData.append("media", media);
    createPost(props, uploadData);

    setOpenText(false);
    setTitle("");
    setDescription("");
  };

  var mediaType = "";
  if (post_type === "A") mediaType = "audio/*";
  else if (post_type === "V") mediaType = "video/*";
  else mediaType = "image/*";
  return (
    <div className={classes.root}>
      {/*=======================TextModal========================================  */}
      <Modal
        aria-labelledby="title"
        aria-describedby="description"
        open={openText}
        onClose={handleClose}
      >
        <div className={classes.paperModal}>
          <h2 className={classes.h2} id="title">
            Create Post
          </h2>
          <form id="description" onSubmit={handleSubmit}>
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

            {post_type === "T" ? (
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
                <br />
                <br />
                <span>Upload File*</span>
                <br />

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
                type="submit"
                variant="contained"
                color="primary"
                className={classes.button}
              >
                Post
              </Button>
            </div>
          </form>
        </div>
      </Modal>

      {/*======================Create Shouts============= */}

      <Grid item xs={12}>
        <Paper className={classes.paper_grid}>
          <div className={classes.create__top}>
            <Avatar src={profilepic()} />
            <form>
              <input
                className={classes.create__input}
                type="text"
                placeholder={`What's on your mind ${user}?`}
                onClick={() => {
                  handleOpen();
                  setPostType("T");
                }}
              />
            </form>
          </div>
        </Paper>
      </Grid>
      <br />
      <Grid item xs={12}>
        <Paper className={classes.paper_grid}>
          <div className={classes.create__bottom}>
            <div
              className={classes.create__option}
              onClick={() => {
                handleOpen();
                setPostType("V");
                setDescription("");
              }}
            >
              <VideocamIcon style={{ color: "red" }} />
              <h3>Video</h3>
            </div>
            <div
              className={classes.create__option}
              onClick={() => {
                handleOpen();
                setPostType("I");
                setDescription("");
              }}
            >
              <AddAPhotoIcon style={{ color: "green" }} />
              <h3>Photo</h3>
            </div>
            <div
              className={classes.create__option}
              onClick={() => {
                handleOpen();
                setPostType("A");
                setDescription("");
              }}
            >
              <AudiotrackIcon style={{ color: "orange" }} />
              <h3>Audio</h3>
            </div>
          </div>
        </Paper>
      </Grid>
    </div>
  );
}
const mapStateToProps = (state) => ({
  shouts: state.shouts,
  user: state.login,
  profiles: state.friendList.profiles,
});
export default connect(mapStateToProps)(CreateShouts);

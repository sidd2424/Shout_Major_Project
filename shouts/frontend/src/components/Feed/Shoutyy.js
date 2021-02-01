import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import ReactPlayer from "react-player";
import ReactAudioPlayer from "react-audio-player";
import DeleteModal from "./DeleteModal";
import EditModal from "./EditModal";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { connect } from "react-redux";
import { getLikes } from "../../actions/LikeActions";
import Cookies from "js-cookie";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import ShowReport from "../ShoutReport/ShowReport";

import ShowComment from "../ShowComment/ShowComment";

import axios from "axios";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
const useStyles = makeStyles((theme) => ({
  root: {
    margin: "100px",
    borderRadius: "15px",
    marginTop: "20px",
    width: "80%",
    margin: "7%",
    "@media (max-width: 900px)": {
      width: "70%",
      marginLeft: "15%",
    },
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
  paper_grid: {
    padding: theme.spacing(2),
    textAlign: "left",
    color: "#f1f2f5",
    borderRadius: "15px",
    width: "60%",
    marginLeft: "20%",
    backgroundColor: "#f1f2f5",
    "@media (max-width: 500px)": {
      width: "70%",
      marginLeft: "10%",
    },
  },
  shout: {
    backgroundColor: "#f1f2f5",
    marginTop: "20px",
  },
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    borderRadius: "15px",
    outline: 0,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  large: {
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
  like_button: {
    width: "1rem",
    textAlign: "center",
  },
  likes: {
    backgroundColor: "#3f51b5",
    color: "white",
  },
  like_unlike: {
    color: "white",
  },
  subheader: {
    color: "white",
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

function Shout(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const username = sessionStorage.getItem("user");

  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [postTitle, setPostTitle] = useState("");
  const [postId, setPostId] = useState("");
  const [postContent, setPostContent] = useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);

  // const [isLiked, setIsLiked] = useState(true);

  const csrftoken = Cookies.get("csrftoken");
  useEffect(() => {
    getLikes(props);
  }, []);

  const [formData, setFormData] = useState({
    user_id: props.user.user_id,
    shout_id: props.shouts.post_id,
    // like_id: props.like.id,
  });
  //----------------------Delete Like-------------------//
  const deleteLike = (id) => {
    axios({
      method: "delete",
      url: `http://localhost:8000/api/shoutlike/${id}/`,
      headers: {
        "X-CSRFToken": csrftoken,
      },
    })
      // .then((res) => getLike(props))
      .then((data) => getLikes(props))
      .catch((error) => console.log(error));
  };

  //---------------------------Handle Submit Like----------------------//
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:8000/api/shoutlike/", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken,
      },
    })
      .then((response) => response.json())
      .then((data) => getLikes(props));
  };
  //------------------------------Handle Unlike--------------------//
  const handleUnlike = (data) => {
    for (let lk of props.like) {
      if (lk.shout_id === data.post_id && lk.user_id === props.user.user_id) {
        deleteLike(lk.id);
      }
    }
  };

  let fil = props.like.filter((c) => c.shout_id === props.shouts.post_id);
  const like_count = fil.length;

  let filtercomment = props.comments.filter(
    (c) => c.shout_id === props.shouts.post_id
  );
  const comment_count = filtercomment.length;

  const isLiked = (data) => {
    for (let lk of props.like) {
      if (lk.shout_id === data.post_id && lk.user_id === props.user.user_id) {
        return false;
      }
    }

    return true;
  };

  // console.log("Like--------------->", props);

  //-----------------------------Show Count Like--------------
  const [open, setOpen] = React.useState(false);
  const [modalStyle] = React.useState(getModalStyle);
  const handleOpenLike = () => {
    setOpen(true);
  };

  const handleCloseLike = () => {
    setOpen(false);
  };
  const getData = (item) => {
    for (let profile of props.profiles) {
      if (profile.user_id === item.user_id) {
        return (
          <>
            <td>
              <Avatar
                alt="Brian Adams"
                src={profile.user_image.slice(21)}
                className={classes.large}
              ></Avatar>
            </td>
            <td>
              <span>{profile.username}</span>
            </td>
          </>
        );
      }
    }
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <table>
        <tbody>
          {fil.map((item, k) => (
            <tr key={k}>{getData(item)}</tr>
          ))}
        </tbody>
        <tfoot></tfoot>
      </table>
    </div>
  );

  // ===========================Menu================================
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleModalClose = () => {
    setModalOpen(false);
    setEditModalOpen(false);
  };
  // ===========================Delete================================
  const onDeletePost = (postTitle, postId) => {
    setModalOpen(true);
    setPostTitle(postTitle);
    setPostId(postId);
  };
  // ===========================Edit================================
  const onEditePost = (postContent, postTitle, postId) => {
    setEditModalOpen(true);
    setPostContent(postContent);
    setPostTitle(postTitle);
    setPostId(postId);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  let action = <div></div>;

  const profilepic = (data) => {
    for (let item1 of props.profiles) {
      if (item1.username === data.username) {
        return item1.user_image.slice(21);
      }
    }
  };

  return (
    <Grid item xs={12} className={classes.shout}>
      <Paper className={classes.paper_grid}>
        <Card className={classes.root} spacing={1} key={props.shouts.post_id}>
          <CardHeader
            className={classes.likes}
            classes={{ subheader: classes.subheader }}
            avatar={
              <Avatar
                aria-label="recipe"
                className={classes.avatar}
                src={profilepic(props.shouts)}
              ></Avatar>
            }
            action={
              props.shouts.username == username ? (
                <IconButton
                  aria-label="settings"
                  onClick={handleClick}
                  className={classes.like_unlike}
                >
                  <MoreVertIcon />
                </IconButton>
              ) : (
                <div></div>
              )
            }
            title={props.shouts.username}
            subheader={props.shouts.date_posted}
          />

          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem
              onClick={(e) => {
                handleClose();
                onEditePost(postContent, postTitle, postId);
              }}
            >
              Edit
            </MenuItem>
            <MenuItem
              onClick={(e) => {
                handleClose();
                onDeletePost(postTitle, postId);
              }}
            >
              Delete
            </MenuItem>
          </Menu>
          <CardContent>
            <Typography variant="h6" color="textSecondary" component="p">
              {props.shouts.title}
            </Typography>
          </CardContent>
          {props.shouts.post_type === "I" ? (
            <CardMedia
              className={classes.media}
              image={props.shouts.media}
              title="Paella dish"
            />
          ) : null}
          {props.shouts.post_type === "T" ? (
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                {props.shouts.description}
              </Typography>
            </CardContent>
          ) : null}
          {props.shouts.post_type === "A" ? (
            <CardContent>
              <div className={classes.audio}>
                <ReactAudioPlayer
                  src={props.shouts.media}
                  controls
                  style={{ width: "100%" }}
                />
              </div>
            </CardContent>
          ) : null}
          {props.shouts.post_type === "V" ? (
            <CardContent>
              <div>
                <ReactPlayer
                  width="100%"
                  height="100%"
                  url={props.shouts.media}
                  playing={false}
                  controls={true}
                  light={false}
                  loop={true}
                  volume={0}
                  muted={false}
                />
              </div>
            </CardContent>
          ) : null}
{/* ----------------------------Like Section------------------------------------------ */}
          <CardActions disableSpacing className={classes.likes}>
            {isLiked(props.shouts) ? (
              <>
                <IconButton
                  aria-label="add to favorites"
                  onClick={handleSubmit}
                  className={classes.like_unlike}
                >
                  <ThumbUpIcon />
                </IconButton>
                <p onClick={handleOpenLike} className={classes.like_button}>
                  {like_count}
                </p>
                <Modal
                  open={open}
                  onClose={handleCloseLike}
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                >
                  {body}
                </Modal>
              </>
            ) : (
              <>
                <IconButton
                  aria-label="add to favorites"
                  onClick={() => handleUnlike(props.shouts)}
                  className={classes.like_unlike}
                >
                  <ThumbDownIcon />
                </IconButton>
                <p onClick={handleOpenLike} className={classes.like_button}>
                  {like_count}
                </p>
                <Modal
                  open={open}
                  onClose={handleCloseLike}
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                >
                  {body}
                </Modal>
              </>
            )}
{/* ==================Comment Section====================== */}
            <IconButton aria-label="comment" className={classes.like_unlike}>
              <ShowComment shouts={props.shouts} />
            </IconButton>
            <p style={{ marginLeft: "0.2rem", marginRight: "0.2rem" }}>
              {comment_count}
            </p>
{/* ===============Report Section================== */}
            <IconButton aria-label="comment" className={classes.like_unlike}>
              <ShowReport shouts={props.shouts} />
            </IconButton>
          </CardActions>

          <DeleteModal
            open={modalOpen}
            handleClose={handleModalClose}
            postTitle={props.shouts.title}
            postId={props.shouts.post_id}
            myshout={props.myshouts}
          />
          <EditModal
            open={editModalOpen}
            handleClose={handleModalClose}
            postTitle={props.shouts.title}
            postContent={props.shouts.description}
            postId={props.shouts.post_id}
            media={props.shouts.media}
            post_type={props.shouts.post_type}
            myshout={props.myshouts}
          />
        </Card>
      </Paper>
    </Grid>
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
export default connect(mapStateToProps)(Shout);

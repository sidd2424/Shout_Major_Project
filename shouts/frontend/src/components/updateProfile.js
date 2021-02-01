import React, { useState } from "react";
import { connect } from "react-redux";
import { Grid, Paper, Avatar, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import UpdateIcon from "@material-ui/icons/Update";
import { useHistory } from "react-router-dom";
import Header1 from "../components/Header/Navbar";

const useStyles = makeStyles({
  avatarTheme: {
    background: "#4d4dff",
  },

  paperStyle: {
    padding: 20,
    height: "70vh",
    width: 350,
    margin: "50px auto",
  },
});

function updateProfile(props) {
  const [bio, setBio] = useState(props.user.bio);
  const history = useHistory();
  const [imageData, setImageData] = useState(null);
  const authToken = props.user.token;

  const handlefilechange = (e) => {
    setImageData(e.target.files[0]);
  };

  let postData = new FormData();

  //----------------------Update Profile-------------------------//

  const handleSubmit = (e) => {
    e.preventDefault();

    let bioObj;
    let resultObj;

    if (imageData === null && bio != "") {
      postData.append("bio", bio);
    } else if (imageData != null && bio === "") {
      postData.append("user_image", imageData, imageData.name);
    } else {
      postData.append("bio", bio);
      postData.append("user_image", imageData, imageData.name);
    }

    fetch(`/profile/getProfile/${props.user.user_id}`, {
      method: "PATCH",
      body: postData,
      headers: {
        Authorization: `Token ${authToken}`,
      },
    })
      .then((respone) => respone.json())
      .then((data) => {
        props.dispatch({
          type: "UpdateUser",
          payload: { bio: bio },
        });
      });

    history.push("/");
  };

  const classes = useStyles();
  return (
    <div>
      <Header1 />
      <Grid>
        <Paper elevation={10} className={classes.paperStyle}>
          <Grid align="center">
            <Avatar className={classes.avatarTheme}>
              <UpdateIcon />
            </Avatar>
            <h2>Update Profile</h2>
          </Grid>
          <TextField
            label="Update Bio"
            placeholder="bio"
            name="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            fullWidth
            required
          />
          <br />
          <br />
          <label htmlFor="upload-photo">
            <input
              style={{ display: "none" }}
              id="upload-photo"
              name="upload-photo"
              onChange={handlefilechange}
              type="file"
            />

            <Button color="secondary" variant="contained" component="span">
              Upload Profile Pic
            </Button>
          </label>

          <br />
          <br />
          <Button
            type="submit"
            color="primary"
            variant="contained"
            onClick={handleSubmit}
            fullWidth
          >
            Update
          </Button>
          <br />
          <br />
        </Paper>
      </Grid>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.login,
  };
};

export default connect(mapStateToProps)(updateProfile);

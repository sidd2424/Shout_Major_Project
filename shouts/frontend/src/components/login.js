import React, { useState } from "react";
import { connect } from "react-redux";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
} from "@material-ui/core";
import LockRoundedIcon from "@material-ui/icons/LockRounded";
import { makeStyles } from "@material-ui/core/styles";
import { Link, Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  avatarTheme: {
    background: "#2D3EC2",
  },

  paperStyle: {
    padding: 20,
    height: "70vh",
    width: 350,
    margin: "50px auto",
  },
});

function login(props) {
  const history = useHistory();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = ({ target }) => {
    const { name, value } = target;

    setFormData({ ...formData, [name]: value });
  };

  //-----------------Handle LogIn User--------------------//

  const handleSubmit = (e) => {
    e.preventDefault();

    //-----------Validations if correct then log in User-------------//
    if (!formData.email.includes("@")) {
      // alert("Please enter valid Email");
      setMessage("Please enter valid Email");
    } else if (formData.email != "" && formData.password != "") {
      fetch("/profile/login/", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((respone) => respone.json())
        .then((data) => {
          props.dispatch({
            type: "AddToken",
            payload: data,
          });
        })
        .catch(() => setMessage("Incorrect Credentials"));
    } else if (formData.password === "") {
      // alert("Please enter password");
      setMessage("Please enter password");
    } else if (formData.email === "") {
      // alert("Please enter email");
      setMessage("Please enter email");
    } else {
      // alert("Please enter email and password");
      setMessage("Please enter email and password");
    }
  };
  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 350,
    margin: "50px auto",
  };

  const classes = useStyles();
  if (props.user.isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <div>
        <Grid>
          <Paper elevation={10} className={classes.paperStyle}>
            <Grid align="center">
              <Avatar className={classes.avatarTheme}>
                <LockRoundedIcon />
              </Avatar>
              <h2>Sign In</h2>
            </Grid>

            <TextField
              label="Email"
              placeholder="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Password"
              placeholder="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              fullWidth
              required
            />

            <br />
            <br />
            <br />

            <Button
              type="submit"
              color="primary"
              variant="contained"
              onClick={handleSubmit}
              fullWidth
            >
              Sign In
            </Button>
            <br />
            <br />
            <Typography>
              Don't have an account yet?
              <Link to="/register">Sign Up</Link>
            </Typography>
            <br />
            <br />
            <div style={{ textAlign: "center", color: "red" }}>
              <Typography>{message}</Typography>
            </div>
          </Paper>
        </Grid>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.login,
  };
};

export default connect(mapStateToProps)(login);

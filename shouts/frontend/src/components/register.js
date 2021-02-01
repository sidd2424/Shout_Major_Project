import React, { useState } from "../../node_modules/react";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
} from "@material-ui/core";
import { useHistory, Link } from "react-router-dom";

import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  avatarTheme: {
    background: "#2D3EC2",
  },
  input: {
    display: "none",
  },
  paperStyle: {
    padding: 20,
    height: "80vh",
    width: 350,
    margin: "50px auto",
  },
});

export default function register() {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    is_active: true,
  });

  const history = useHistory();
  const [message, setMessage] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [imageData, setImageData] = useState(null);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFormData({ ...formData, [name]: value });
  };

  const handleConfirmPassword = ({ target }) => {
    setConfirmPassword(target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.email !== "" && formData.password !== "") {
      //--------------Register Or Create New User-------------//

      if (formData.password === confirmPassword) {
        fetch("/profile/register/", {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((respone) => respone.json())
          .then((data) => {
            if (data.email[0] === "profile with this email already exists.") {
              setMessage(data.email[0]);
            } else if (
              data.username[0] === "profile with this username already exists."
            ) {
              setMessage(data.username[0]);
            } else if (
              data.email[0] === "profile with this email already exists." &&
              data.username[0] === "profile with this username already exists."
            ) {
              setMessage(data.email[0] + data.username[0]);
            } else {
              history.push("/login");
            }
          })
          .catch((e) => setMessage("Please enter valid data "));
      } else {
        // alert("Password and Confirm Password should be same");
        setMessage("Password and Confirm Password should be same");
      }
    } else {
      setMessage("Please enter valid data");
    }
  };

  const classes = useStyles();
  return (
    <>
      <div>
        <Grid>
          <Paper elevation={10} className={classes.paperStyle}>
            <Grid align="center">
              <Avatar className={classes.avatarTheme}>
                <AccountCircleIcon />
              </Avatar>
              <h2>Register</h2>
            </Grid>

            <TextField
              label="Username"
              placeholder="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              fullWidth
              required
            />

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
            <TextField
              label="Confirm Password"
              placeholder="Confirm Password"
              name="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPassword}
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
              Register
            </Button>
            <br />
            <br />
            <Typography>
              Already have an account?
              <Link to="/login">Sign In</Link>
            </Typography>

            <div style={{ textAlign: "center", color: "red" }}>
              <Typography>{message}</Typography>
            </div>
          </Paper>
        </Grid>
      </div>
    </>
  );
}

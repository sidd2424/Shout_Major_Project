import React, { useState } from "react";
import Report from "./Report";
import ReportIcon from "@material-ui/icons/Report";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import IconButton from "@material-ui/core/IconButton";

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

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    //       border: '2px solid #000',
    borderRadius: "15px",
    outline: 0,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function ShowReport(props) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <Report shouts={props.shouts} />
    </div>
  );
  const [showComponent, setShowComponent] = useState(false);

  const _onButtonClick = () => {
    setShowComponent(true);
  };

  return (
    <div style={{ height: "1.3rem" }}>
      <p
        type="button"
        onClick={handleOpen}
        style={{ color: "white", fontSize: "16px", marginTop: "-2px" }}
      >
        <ReportIcon />
       
      </p>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.login,
    like: state.like.like,
    profiles: state.friendList.profiles,
    reports: state.report.report,
  };
};

export default connect(mapStateToProps)(ShowReport);

import React, { useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import Cookies from "js-cookie";
import ReportIcon from "@material-ui/icons/Report";
import ReportOffIcon from "@material-ui/icons/ReportOff";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { getReports } from "../Services/ReportService";

function Report(props) {
  // const [isReported, setIsReported] = useState(true);
  const [postReport, setPostReport] = useState("");

  const csrftoken = Cookies.get("csrftoken");
  console.log(csrftoken);
  const [anchorEl, setAnchorEl] = React.useState(null);


  console.log("props of Report", props);
  // console.log("this event.target.innerText", event.target.innerText);

  //----------------------Delete Report----------------------//
  const authToken = props.user.token;

  const deleteReport = (id) => {
    axios({
      method: "delete",
      url: `http://localhost:8000/api/shoutreport/${id}/`,

      headers: {
        Authorization: `Token ${authToken}`,
        "X-CSRFToken": csrftoken,
      },
    })
      
      .then((response) => getReports(props))
      .catch((error) => console.log(error));
  };

  //-------------------------------HandleClick----------------------------//

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  //----------------------------Post Report-------------------------//
  const handleReport = (event, post_id, user_id) => {
    console.log("evevent.target.innerText", event.target.innerText);

    setAnchorEl(null);
    console.log("this event.target.innerText", event.target.innerText);

    const output = {
      user_id: user_id,
      shout_id: post_id,
      report_type: event.target.innerText,
    };

    console.log("output", output);
    fetch("http://localhost:8000/api/shoutreport/", {
      method: "POST",
      body: JSON.stringify(output),
      headers: {
        Authorization: `Token ${authToken}`,
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken,
      },
    })
      .then((response) => response.json())
      .then((data) => getReports(props));
  };

  //-------------------Handle Remove Report-------------------------//
  const handleRemoveReport = (data) => {
    for (let report of props.reports) {
      if (
        report.shout_id === data.post_id &&
        report.user_id === props.user.user_id
      ) {
        console.log("isReported false");
        deleteReport(report.id);
      }
    }
  };

  const isReported = (data) => {
    for (let report of props.reports) {
      if (
        report.shout_id === data.post_id &&
        report.user_id === props.user.user_id
      ) {
        console.log("isReported false");
        return false;
      }
    }
    console.log("isReported true");
    return true;
  };

  console.log("report---------------", props);
  return (
    <div>
      <form action="">
        {isReported(props.shouts) ? (
          <div>
            <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              Report Type
            </Button>
            <Menu
              id="simple-menu"
              // report={report}
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem
                value={postReport}
                // onChange={(e) => setPostReport(e.target.innerText)}
                onClick={(e) =>
                  handleReport(e, props.shouts.post_id, props.user.user_id)
                }
              >
                Abuse and Spam
              </MenuItem>
              <MenuItem
                value={postReport}
                // onChange={(e) => setPostReport(e.target.innerText)}
                onClick={(e) =>
                  handleReport(e, props.shouts.post_id, props.user.user_id)
                }
              >
                Exploitation
              </MenuItem>
              <MenuItem
                value={postReport}
                // onChange={(e) => setPostReport(e.target.innerText)}
                onClick={(e) =>
                  handleReport(e, props.shouts.post_id, props.user.user_id)
                }
              >
                Underage Children
              </MenuItem>
              <MenuItem
                value={postReport}
                // onChange={(e) => setPostReport(e.target.innerText)}
                onClick={(e) =>
                  handleReport(e, props.shouts.post_id, props.user.user_id)
                }
              >
                Other types of Reports
              </MenuItem>
            </Menu>
          </div>
        ) : (
          <Button
            type="button"
            name="unlike_button"
            value="like"
            onClick={() => handleRemoveReport(props.shouts)}
          >
            <ReportOffIcon /> Remove Report
          </Button>
        )}
      </form>
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

export default connect(mapStateToProps)(Report);

import React, { useEffect } from "react";
import SideBarRow from "./SideBarRow";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
import CreateIcon from "@material-ui/icons/Create";
import { makeStyles } from "@material-ui/core";
import {getPosts} from "../../actions/PostActions"
import { connect } from "react-redux";
const useStyles=makeStyles({
  sidebar:{
    padding:"25px 10px",
    flex:0.33,
  }
})
function SideBar() {
  const classes=useStyles();
  
  return (
    <div className={classes.sidebar}>
      <SideBarRow
        src="https://images.unsplash.com/photo-1563306406-e66174fa3787?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NXx8Z2lybHxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60"
        title="Amy Santiago"
      />
      <SideBarRow Icon={SupervisedUserCircleIcon} title="Friends" />
      <SideBarRow Icon={CreateIcon} title="Posts" />
    </div>
  );
}

export default SideBar;

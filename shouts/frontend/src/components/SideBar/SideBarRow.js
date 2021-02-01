import { Avatar, makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles({
  sideBarRow: {
    display: "Flex",
    alignItems: "center",
    padding: "10px",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "lightgray",
      borderRadius: "10px",
    },
    "& h4": {
      marginLeft: "20px",
      fontWeight: 600,
    },
  },

  icons: {
    fontSize: "xx-large",
    color: "#80ced6",
  },
});
function SideBarRow({ src, Icon, title }) {
  const classes = useStyles();
  return (
    <div className={classes.sideBarRow}>
      {src && <Avatar src={src} />}
      {Icon && <Icon className={classes.icons} />}
      <h4>{title}</h4>
    </div>
  );
}

export default SideBarRow;

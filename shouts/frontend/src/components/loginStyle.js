import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },

  green: {
    color: "#fff",
    backgroundColor: green[500],
  },
}));

export default useStyles;

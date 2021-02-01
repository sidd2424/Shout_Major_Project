import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "1rem",
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.primary,
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  extraLarge: {
    width: theme.spacing(14),
    height: theme.spacing(14),
    marginLeft: "auto",
    marginRight: "auto",
  },
  cardFlex: {
    display: "flex",
    fontSize: 18,
  },
  cardDashboard: {
    display: "flex",
    flexDirection: "column",
    fontSize: 18,
  },
  autoComplete: {
    color: "white",
  },
}));

export default useStyles;

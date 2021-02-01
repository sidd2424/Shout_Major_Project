import React, { useState } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import HomeIcon from "@material-ui/icons/Home";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
import UpdateIcon from "@material-ui/icons/Update";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../store/store";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  links: {
    color: "white",
    width: "48px",
    cursor: "pointer",
    textDecoration: "none",
    "&:hover": {
      color: "blue",
      backgroundColor: "#eff2f5",
      borderRadius: "10px",
    },
    "&:active": {
      color: "black",
    },
  },
  linksMobile: {
    color: "blue",
    cursor: "pointer",
    textDecoration: "none",
    "&:hover": {
      backgroundColor: "#eff2f5",
      borderRadius: "10px",
    },
    "&:active": {
      color: "black",
    },
  },
}));

function Navbar(props) {
  const history = useHistory();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const searchPosts = (e) => {
    props.dispatch({
      type: "Search Posts",
      payload: e.target.value,
    });
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );
  const [isAuthenticated, setisAuthenticated] = useState(true);

  const logout = () => {
    props.dispatch({
      type: "AddToken",
      payload: "",
    });
    props.dispatch({
      type: "AddUser",
      payload: "",
    });
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user")
    setisAuthenticated(false);
    window.location.href = "/app/login";
  };

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <Link exact to="/" className={classes.linksMobile}>
        <MenuItem>
          <IconButton aria-label="show 4 new mails" color="inherit">
            <HomeIcon data-testid="homeMob" />
          </IconButton>
          <p>Home</p>
        </MenuItem>
      </Link>
      <Link to="/mypost" className={classes.linksMobile}>
        <MenuItem>
          <IconButton aria-label="show 4 new mails" color="inherit">
            <AccountCircle data-testid="profileMob" />
          </IconButton>
          <p>My Profile</p>
        </MenuItem>
      </Link>
      <Link to="/dashboard" className={classes.linksMobile}>
        <MenuItem>
          <IconButton aria-label="show 11 new notifications" color="inherit">
            <SupervisedUserCircleIcon data-testid="friendsMob" />
          </IconButton>
          <p>Friends</p>
        </MenuItem>
      </Link>

      <Link to="/updateProfile" className={classes.linksMobile}>
        <MenuItem>
          <IconButton aria-label="show 11 new notifications" color="inherit">
            <UpdateIcon />
          </IconButton>
          <p>Update Profile</p>
        </MenuItem>
      </Link>

      <Link to="#" className={classes.linksMobile} onClick={logout}>
        <MenuItem>
          <IconButton
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <PowerSettingsNewIcon data-testid="logoutMob" />
          </IconButton>
          <p>Logout</p>
        </MenuItem>
      </Link>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            <div>Shout It</div>
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <form>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
                value={props.postSearch}
                onChange={searchPosts}
                data-testid="search"
              />
            </form>
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <Link to="/" className={classes.links}>
              <IconButton aria-label="show 4 new mails" color="inherit">
                <HomeIcon data-testid="home" />
              </IconButton>
            </Link>
            <Link to="/mypost" className={classes.links}>
              <IconButton aria-label="show 4 new mails" color="inherit">
                <AccountCircle data-testid="profile" />
              </IconButton>
            </Link>
            <Link to="/dashboard" className={classes.links}>
              <IconButton
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <SupervisedUserCircleIcon data-testid="friends" />
              </IconButton>
            </Link>

            <Link to="/updateProfile" className={classes.links}>
              <IconButton
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <UpdateIcon />
              </IconButton>
            </Link>

            <Link to="#" className={classes.links}>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-haspopup="true"
                color="inherit"
                onClick={logout}
              >
                <PowerSettingsNewIcon data-testid="logout" />
              </IconButton>
            </Link>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MenuIcon data-testid="menu" />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    postSearch: state.postSearch,
    user: state.login,
  };
};

export default connect(mapStateToProps)(Navbar);

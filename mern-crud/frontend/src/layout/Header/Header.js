import { useContext, Fragment } from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import classes from "./Header.module.css";
import { Link } from "react-router-dom";
import AuthContext from "../../store/user/AuthContext";

export const Header = () => {
  const auth = useContext(AuthContext);
  // console.log('****** auth ', auth);

  const onLogouthandler = () => {
    auth.logout();
  }

  return (
    <Fragment>
      <CssBaseline />
      <AppBar
        position="static"
        color="primary"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{ flexWrap: "wrap" }}>
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            Books App
          </Typography>
          <nav>
            <Link className={classes.link} to="/books">Books</Link>
            { auth.isLoggedIn && (
              <Fragment>
              <Link className={classes.link} to={`/books/${auth.userId}`}>My Books</Link>
              <Link className={classes.link} to="/create">Create Book</Link>
              </Fragment>
            )}
          </nav>
          { auth.isLoggedIn && (
            <Button
            onClick={onLogouthandler}
            variant="contained"
            color="primary"
            className={classes.login} 
            sx={{ my: 1, mx: 1.5 }}
          >
            Logout
          </Button>            
          )}
          { !auth.isLoggedIn && (
          <Button
              component={Link}
              to="/signin"
              variant="contained"
              color="primary"
              className={classes.login} 
              sx={{ my: 1, mx: 1.5 }}
            >
              Login
            </Button> 
          )}         
        </Toolbar>
      </AppBar>
    </Fragment>
  );
};

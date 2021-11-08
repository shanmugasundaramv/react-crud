import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import classes from "./Header.module.css";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <React.Fragment>
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
            <Link className={classes.link} to="/create">Create Book</Link>
          </nav>
          <Button href="#" className={classes.login} sx={{ my: 1, mx: 1.5 }}>
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

import { Fragment } from "react";
import { CssBaseline } from "@mui/material";
import { Header } from "./Header/Header";
import classes from "./Layout.module.css"

export const Layout = (props) => {
  return (
    <Fragment>
      <CssBaseline />
      <Header />
      <main className={classes.mainContainer}>{props.children}</main>
    </Fragment>
  );
};

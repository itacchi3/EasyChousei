import React, { useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { ThemeProvider } from "@material-ui/styles";
import EventEntry from "./EventEntry";
import Event from "./Event";
import InputDates from "./InputDates";
import liff from "@line/liff";

import "./assets/styles/App.css";

import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#4bc2d2",
      main: "#1FB3C7",
      dark: "#157d8b",
      contrastText: "#fff",
    },
  },
});

const App = () => {
  const initializeLiff = (myLiffId) => {
    liff.init({
      liffId: myLiffId,
    });
  };
  // Liff初期化
  initializeLiff("1655990844-zDNWJmmx");

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Grid
          container
          direction="column"
          justify="space-between"
          alignItems="center"
          spacing={3}
        >
          <Grid container item>
            <Grid item className="app-header">
              Easy調整入力くん
            </Grid>
          </Grid>
          <Grid
            container
            item
            className="app-content"
            direction="column"
            alignItems="center"
            justify="flex-start"
          >
            <Route exact path="/" component={EventEntry} />
            <Route exact path="/event/:id" component={Event} />
            <Route exact path="/event/:id/input" component={InputDates} />
          </Grid>
        </Grid>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;

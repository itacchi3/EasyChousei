import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { ThemeProvider } from "@material-ui/styles";
import EventEntry from "./EventEntry";
import Event from "./Event";
import InputDates from "./InputDates";
import liff from "@line/liff"; // 追加

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
  /* 追加: メッセージ送信 */
  const sendMessage = () => {
    liff
      .init({ liffId: "1655990844-zDNWJmmx" }) // LIFF IDをセットする
      .then(() => {
        if (!liff.isLoggedIn()) {
          liff.login({}); // ログインしていなければ最初にログインする
        } else if (liff.isInClient()) {
          // LIFFので動いているのであれば
          liff
            .sendMessages([
              {
                // メッセージを送信する
                type: "text",
                text: "You've successfully sent a message! Hooray!",
              },
            ])
            .then(function () {
              window.alert("Message sent");
            })
            .catch(function (error) {
              window.alert("Error sending message: " + error);
            });
        }
      });
  };

  /* 追加: UserProfileをAlertで表示 */
  const getUserInfo = () => {
    liff.init({ liffId: "1655990844-zDNWJmmx" }).then(() => {
      if (!liff.isLoggedIn()) {
        liff.login({}); // ログインしていなければ最初にログインする
      } else if (liff.isInClient()) {
        liff
          .getProfile() // ユーザ情報を取得する
          .then((profile) => {
            const userId = profile.userId;
            const displayName = profile.displayName;
            alert(`Name: ${displayName}, userId: ${userId}`);
          })
          .catch(function (error) {
            window.alert("Error sending message: " + error);
          });
      }
    });
  };
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
            <button className="button" onClick={sendMessage}>
              send message
            </button>{" "}
            <button className="button" onClick={getUserInfo}>
              show user info
            </button>{" "}
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

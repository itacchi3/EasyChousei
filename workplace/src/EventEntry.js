import React, { useState } from "react";
import { withRouter } from "react-router";
import { firebaseApp } from "./config/firebase";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import { TextField } from "@material-ui/core";

import "./EventEntry.css";

const firebaseDb = firebaseApp.database();

const EventEntry = (props) => {
  // 1-1.入力フォームの内容をstateに反映しよう
  // イベント名
  const [eventName, setEventName] = useState("");
  // 説明
  const [description, setDescription] = useState("");
  // イベント候補日
  const [possibleDateText, setPossibleDateText] = useState("");

  // "イベントを作る"ボタンを押すとregisterEvent関数が起動します。
  const registerEvent = async () => {
    const possibleDates = possibleDateText.split("\n");
    // 1-3-1.入力した値を整形しよう
    const eventData = {
      name: eventName,
      description: description,
      dates: possibleDates,
    };
    // 1-3-2.Realtime Databaseに整形した値を書き込もう
    // 1-4.イベントIDを取得して画面遷移しよう
    const eventId = firebaseDb.ref("events").push(eventData).key;
    console.log(eventId);
    props.history.push(`/event/${eventId}`);
  };

  return (
    <Grid
      id="event-entry"
      container
      item
      direction="column"
      justify="space-between"
      alignItems="center"
      xs={12}
    >
      <Grid container item xs={11} justify="flex-start">
        <div className="guide-title">
          <Chip color="primary" label="1" className="guide-title__chip" />
          イベント概要を入力
        </div>
        <TextField
          placeholder="イベント名"
          //1-1入力された値をstateで管理しましょう
          onChange={(evt) => setEventName(evt.target.value)}
          // 1-2.入力フォームの内容をstateから取得して表示しよう
          value={eventName}
          fullWidth={true}
          variant="outlined"
        />
        <TextField
          placeholder="説明"
          //1-1入力された値をstateで管理しましょう
          onChange={(evt) => setDescription(evt.target.value)}
          // 1-2.入力フォームの内容をstateから取得して表示しよう
          value={description}
          margin="normal"
          multiline
          rows={7}
          fullWidth={true}
          variant="outlined"
        />
      </Grid>
      <Grid container item xs={11} justify="flex-start">
        <div className="guide-title">
          <Chip color="primary" label="2" className="guide-title__chip" />
          イベント候補日を入力
        </div>
        <TextField
          placeholder="例：12/4 18:00~"
          value={possibleDateText}
          onChange={(evt) => setPossibleDateText(evt.target.value)}
          className="Guide-title"
          multiline
          rows={7}
          fullWidth={true}
          variant="outlined"
        />
      </Grid>
      <Grid container item xs={12} justify="flex-end" className="button-area">
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={() => registerEvent()}
          >
            イベントを作る
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default withRouter(EventEntry);

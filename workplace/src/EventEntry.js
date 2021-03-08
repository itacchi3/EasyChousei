import React, { useState } from "react";
import { withRouter } from "react-router";
import { firebaseApp } from "./config/firebase";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import { TextField } from "@material-ui/core";
import { Calendar } from "react-multi-date-picker";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";

import "./EventEntry.css";

const firebaseDb = firebaseApp.database();

const useStyles = makeStyles({
  root: {
    width: 300,
  },

  slider: {
    marginTop: 20,
  },
});

const EventEntry = (props) => {
  const classes = useStyles();
  // 1-1.入力フォームの内容をstateに反映しよう
  // イベント名
  const [eventName, setEventName] = useState("");
  // 説明
  const [description, setDescription] = useState("");
  // イベント候補日
  const [dates, setDates] = useState([]);
  // 時間幅
  const [timeWidth, setTimeWidth] = useState([0, 24]);
  // 時間区切り
  const [timeInterval, setTimeInterval] = useState([60]);

  console.log(eventName);
  console.log(description);
  console.log(dates);
  console.log(timeWidth);
  console.log(timeInterval);

  const toString = Object.prototype.toString;
  console.log(toString.call(dates[0]));

  const handleChange = (event, newTimeWidth) => {
    setTimeWidth(newTimeWidth);
  };
  const handleChange2 = (event, newTimeInterval) => {
    setTimeInterval(newTimeInterval);
  };
  const marksTimeWidth = [
    {
      value: 0,
      label: "0:00",
    },
    {
      value: 12,
      label: "12:00",
    },
    {
      value: 24,
      label: "24:00",
    },
  ];
  const marksTimeInterval = [
    {
      value: 15,
      label: "15分",
    },
    {
      value: 30,
      label: "30分",
    },
    {
      value: 60,
      label: "60分",
    },
    {
      value: 120,
      label: "120分",
    },
  ];
  const possibleDates = dates.map((date) => date.day);
  console.log(possibleDates);

  // "イベントを作る"ボタンを押すとregisterEvent関数が起動します。
  const registerEvent = async () => {
    // 1-3-1.入力した値を整形しよう
    const possibleDates = dates.map(
      (date) => date.year + "/" + date.month + "/" + date.day
    );

    const sortedPossibleDates = [...possibleDates].sort(
      (a, b) => new Date(a) - new Date(b)
    );
    console.log(sortedPossibleDates);
    const eventData = {
      name: eventName,
      description: description,
      dates: sortedPossibleDates,
      timeWidth: timeWidth,
      timeInterval: timeInterval,
    };
    // 1-3-2.Realtime Databaseに整形した値を書き込もう
    // 1-4.イベントIDを取得して画面遷移しよう
    const eventId = firebaseDb.ref("events").push(eventData).key;
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
      spacing={3}
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
        <Grid container item xs={11} justify="center" alignItems="center">
          {/* <TextField
            placeholder="例：12/4 18:00~"
            value={dates}
            // onChange={(evt) => setDates(evt.target.value)}
            className="Guide-title"
            multiline
            rows={7}
            fullWidth={true}
            variant="outlined"
          /> */}

          <Calendar value={dates} onChange={setDates} />
        </Grid>
      </Grid>
      <Grid container item xs={11} justify="center">
        <Grid
          container
          item
          xs={12}
          justify="flex-start"
          alignItems="flex-start"
        >
          <div className="guide-title">
            <Chip color="primary" label="3" className="guide-title__chip" />
            調整したい時間を入力
          </div>
        </Grid>
        <Grid
          container
          item
          xs={9}
          justify="center"
          alignItems="center"
          className={classes.slider}
        >
          <Slider
            value={timeWidth}
            onChange={handleChange}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            step={1}
            marks={marksTimeWidth}
            min={0}
            max={24}
            valueLabelDisplay="on"
          />
        </Grid>
      </Grid>
      <Grid container item xs={11} justify="center">
        <Grid
          container
          item
          xs={12}
          justify="flex-start"
          alignItems="flex-start"
        >
          <div className="guide-title">
            <Chip color="primary" label="4" className="guide-title__chip" />
            時間幅を入力
          </div>
        </Grid>
        <Grid
          container
          item
          xs={9}
          justify="center"
          alignItems="center"
          className={classes.slider}
        >
          <Slider
            value={timeInterval}
            onChange={handleChange2}
            valueLabelDisplay="auto"
            aria-labelledby="track-false-slider"
            step={null}
            marks={marksTimeInterval}
            min={15}
            max={120}
            track={false}
            valueLabelDisplay="on"
          />
        </Grid>
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

import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";
import { firebaseApp } from "./config/firebase";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";
import { AttendanceTable } from "./parts/index";
import { attendeesObjectToArray } from "./DataConvert";
import liff from "@line/liff";

import "./assets/styles/Event.css";

const firebaseDb = firebaseApp.database();

const Event = (props) => {
  //回答者の名前
  const [name, setName] = useState("");
  //回答者のコメント
  const [comment, setComment] = useState("");
  //イベントデータ
  const [event, setEvent] = useState({
    name: "",
    description: "",
    dates: [],
    times: [],
    attendees: [],
    prospectiveDates: [],
  });
  useEffect(() => {
    const eventId = props.match.params.id;
    //Realtime Databaseからデータを取得
    firebaseDb.ref(`events/${eventId}`).on("value", (snapshot) => {
      const eventData = snapshot.val();
      setEvent({
        name: eventData.name,
        description: eventData.description,
        dates: eventData.dates,
        times: eventData.times,
        prospectiveDates: eventData.prospectiveDates,
        attendees: attendeesObjectToArray(eventData.attendees),
      });
    });
  }, [setEvent, props.match.params.id]);

  //Lineで友達にイベントリンクを共有
  const sharedScheduleByLine = () => {
    const eventId = props.match.params.id;
    if (liff.isApiAvailable("shareTargetPicker")) {
      liff.shareTargetPicker([
        {
          type: "text",
          text:
            "【イベント名】\n" +
            event.name +
            "\n" +
            "【概要】\n" +
            event.description +
            "\n" +
            "https://liff.line.me/1656098585-v7VEeZ7Q/event/" +
            eventId,
          wrap: true,
        },
      ]);
    }
  };

  //時間候補入力へ移動
  const answerDates = () => {
    const eventId = props.match.params.id;
    props.history.push({
      pathname: `/event/${eventId}/input`,
      state: {
        event: event,
        eventId: eventId,
        name: name,
        comment: comment,
      },
    });
  };

  return (
    <Grid
      id="event"
      container
      alignItems="center"
      xs={12}
      justify="center"
      spacing={3}
    >
      <Grid
        container
        item
        xs={12}
        direction="column"
        justify="center"
        alignItems="flex-start"
      >
        <Grid item className="guide-title">
          {event.name}
        </Grid>
        <Grid item className="guide-message">
          {event.description}
        </Grid>
      </Grid>
      <Grid
        container
        item
        spacing={3}
        direction="column"
        justify="center"
        alignItems="center"
      >
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={() => sharedScheduleByLine()}
          >
            友達へ共有する
          </Button>
        </Grid>
        <Grid item container>
          <AttendanceTable
            columns={event.prospectiveDates}
            attendees={event.attendees}
          />
        </Grid>
      </Grid>
      <Grid
        container
        item
        xs={12}
        justify="center"
        alignItems="center"
        spacing={3}
      >
        <Grid container item xs={11} direction="column">
          <Grid item className="guide-title">
            出欠を入力してください
          </Grid>
          <Grid item>
            <TextField
              placeholder="名前"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth={true}
              variant="outlined"
            />
            <TextField
              margin="normal"
              placeholder="コメント"
              multiline
              rows={7}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              fullWidth={true}
              variant="outlined"
            />
          </Grid>
        </Grid>
        <Grid
          container
          item
          xs={10}
          spacing={1}
          justify="center"
          alignItems="center"
          direction="row"
        ></Grid>
      </Grid>
      <Grid container item xs={12} justify="center" size="large">
        <Button
          variant="contained"
          color="primary"
          onClick={() => answerDates()}
        >
          時間候補を入力する
        </Button>
      </Grid>
    </Grid>
  );
};

export default withRouter(Event);

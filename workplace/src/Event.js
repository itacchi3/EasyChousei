import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";
import { firebaseApp } from "./config/firebase";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";
import { AttendanceTable, DateButtonGroup } from "./parts";
import { attendeesObjectToArray } from "./DataConvert";

import "./Event.css";

const firebaseDb = firebaseApp.database();

const Event = (props) => {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  // 2-1.ダミーデータを確認しよう
  // コメントアウトを外してください
  const [event, setEvent] = useState({
    name: "",
    description: "",
    dates: [],
    attendees: [],
  });
  const [possibleDates, setPossibleDates] = useState([]);

  // 2-1.ダミーデータを確認しよう
  // コメントアウトしてください
  // const [event, setEvent] = useState({
  //     name: "オンライン交流会",
  //     description: "楽しみましょう",
  //     dates: [ "8/7(月) 20:00～", "8/8(火) 20:00～", "8/9(水) 21:00～" ],
  //     attendees: [
  //       {
  //         name: "一郎",
  //         votes: [ "○", "△", "×" ],
  //         comment: '9日はいけません'
  //       },{
  //         name: "次郎",
  //         votes: ["○", "○", "×"],
  //         comment: ''
  //       }
  //     ]
  //   });
  // const [possibleDates, setPossibleDates] = useState([
  //     {
  //         date: "8/7(月) 20:00～",
  //         vote: '△'
  //     },
  //     {
  //         date: "8/8(火) 20:00～",
  //         vote: '△'
  //     },
  //     {
  //         date: "8/9(水) 21:00～",
  //         vote: '△'
  //     },
  // ]);

  useEffect(() => {
    // 2-2-1.イベントIDを取得しよう
    const eventId = props.match.params.id;
    console.log(eventId + " 62");
    // 2-2-2.Realtime Databaseから取得するデータを特定しよう
    firebaseDb.ref(`events/${eventId}`).on("value", (snapshot) => {
      // 2-2-3.Realtime Databaseからデータを取得しよう
      const eventData = snapshot.val();
      // 2-4.イベント名、説明文、候補日程を表示させよう
      setEvent({
        name: eventData.name,
        description: eventData.description,
        dates: eventData.dates,
        times: eventData.times,
        prospectiveDates: eventData.prospectiveDates,
        attendees: attendeesObjectToArray(eventData.attendees),
      });
      // 2-5.候補日程を表示用に編集しよう
      const newPossibleDate = eventData.prospectiveDates.map((date) => {
        return {
          date: date,
          vote: "△",
        };
      });
      setPossibleDates(newPossibleDate);
    });
  }, [setEvent, setPossibleDates, props.match.params.id]);

  // 出欠回答欄で選択された◯△×の情報はこの関数でstateに保存しています。
  const onSelectVote = (targetDate, selectedVote) => {
    const newPossibleDates = possibleDates.map((possibleDate) => {
      return possibleDate.date === targetDate
        ? { ...possibleDate, vote: selectedVote }
        : possibleDate;
    });
    setPossibleDates(newPossibleDates);
  };

  // 名前入力欄、コメント入力欄、出欠選択欄のstateを初期状態に更新する関数
  const initializeAttendances = () => {
    setName("");
    setComment("");
    setPossibleDates(
      event.dates.map((date) => {
        return {
          date: date,
          vote: "△",
        };
      })
    );
  };

  // "出欠を回答する"ボタンを押すとこの関数が呼び出されます。
  const registerAttendances = async () => {
    // 2-6.出欠情報登録機能を追加しよう
    const eventId = props.match.params.id;
    const votes = possibleDates.map((possibleDate) => possibleDate.vote);
    const attendeesData = {
      name: name,
      votes: votes,
      comment: comment,
    };
    // 出欠情報をRealTimeDatabaseに登録しましょう
    firebaseDb.ref(`events/${eventId}/attendees`).push(attendeesData);
    initializeAttendances();
  };

  return (
    <Grid id="event" container item alignItems="center" xs={12} spacing={3}>
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
        xs={12}
        direction="column"
        justify="center"
        alignItems="center"
      >
        <AttendanceTable
          columns={event.prospectiveDates}
          attendees={event.attendees}
        />
      </Grid>
      <Grid container item xs={12} justify="space-between" spacing={4}>
        <Grid container item xs={11} justify="flex-start" direction="column">
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
        >
          {possibleDates.map((possibleDate) => {
            return (
              <DateButtonGroup
                key={possibleDate.date}
                date={possibleDate.date}
                vote={possibleDate.vote}
                onSelectVote={(vote) => onSelectVote(possibleDate.date, vote)}
              />
            );
          })}
        </Grid>
      </Grid>
      <Grid container item xs={12} justify="center">
        <Button
          variant="contained"
          color="primary"
          onClick={() => registerAttendances()}
        >
          出欠を回答する
        </Button>
      </Grid>
      <Grid container item xs={12} justify="center">
        <Button
          variant="contained"
          color="primary"
          onClick={() => registerAttendances()}
        >
          日程を入力する
        </Button>
      </Grid>
    </Grid>
  );
};

export default withRouter(Event);

import React, { useState } from "react";
import { StickyTable, Row, Cell } from "react-sticky-table";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { green, red, blue } from "@material-ui/core/colors";
import { firebaseApp } from "./config/firebase";

const firebaseDb = firebaseApp.database();

//ボタンの赤色
const redtheme = createMuiTheme({
  palette: {
    primary: {
      main: red[500],
    },
  },
});

//ボタンの緑色
const greentheme = createMuiTheme({
  palette: {
    primary: {
      main: green[500],
    },
  },
});

//ボタンの青色
const bluetheme = createMuiTheme({
  palette: {
    primary: {
      main: blue[500],
    },
  },
});

const InputDates = (props) => {
  //ボタンの色
  const [color, setColor] = useState("Red");
  //入力ボタンが選択されているかどうか
  const [redVarient, setRedVarient] = useState("contained");
  const [greenVarient, setGreenVarient] = useState("outlined");
  const [blueVarient, setBlueVarient] = useState("outlined");
  // const [scrollCheck, setScrollCheck] = useState(false);

  //解答
  const [possibleDates, setPossibleDates] = useState(
    props.location.state.event.prospectiveDates.map((date) => {
      return {
        date: date,
        vote: "△",
      };
    })
  );

  // // スクロール関連メソッド
  // //アロー関数だとバグる
  // var scrollControl = function (event) {
  //   event.preventDefault();
  // };

  // // スクロール禁止
  // const noScroll = () => {
  //   setScrollCheck(false);
  //   // スマホでのタッチ操作でのスクロール禁止
  //   document.addEventListener("touchmove", scrollControl, { passive: false });
  //   console.log(scrollCheck);
  // };
  // // スクロール禁止解除
  // const returnScroll = () => {
  //   setScrollCheck(true);
  //   // スマホでのタッチ操作でのスクロール禁止解除
  //   document.removeEventListener("touchmove", scrollControl, {
  //     passive: false,
  //   });
  //   console.log(scrollCheck);
  // };

  const checkColor = (vote) => {
    switch (vote) {
      case "○":
        return redtheme;
      case "△":
        return greentheme;
      case "×":
        return bluetheme;
      default:
      // do nothing
    }
  };

  const onSelectVote = (targetDate, selectedVote) => {
    const newPossibleDates = possibleDates.map((possibleDate) => {
      return possibleDate.date === targetDate
        ? { ...possibleDate, vote: selectedVote }
        : possibleDate;
    });
    setPossibleDates(newPossibleDates);
  };

  const handleClickRed = () => {
    if (color === "Red") {
      // setRedVarient("outlined");
      // setGreenVarient("outlined");
      // setBlueVarient("outlined");
      // setColor("");
      // returnScroll();
    } else {
      setRedVarient("contained");
      setGreenVarient("outlined");
      setBlueVarient("outlined");
      setColor("Red");
      // noScroll();
    }
  };

  const handleClickGreen = () => {
    if (color === "Green") {
      // setRedVarient("outlined");
      // setGreenVarient("outlined");
      // setBlueVarient("outlined");
      // setColor("");
      // returnScroll();
    } else {
      setRedVarient("outlined");
      setGreenVarient("contained");
      setBlueVarient("outlined");
      setColor("Green");
      // noScroll();
    }
  };

  const handleClickBlue = () => {
    if (color === "Blue") {
      // setRedVarient("outlined");
      // setGreenVarient("outlined");
      // setBlueVarient("outlined");
      // setColor("");
      // returnScroll();
    } else {
      setRedVarient("outlined");
      setGreenVarient("outlined");
      setBlueVarient("contained");
      setColor("Blue");
      // noScroll();
    }
  };

  const handleClickChange = (possibleDate) => {
    switch (color) {
      case "Red":
        onSelectVote(possibleDate.date, "○");
        break;
      case "Green":
        onSelectVote(possibleDate.date, "△");
        break;
      case "Blue":
        onSelectVote(possibleDate.date, "×");
        break;
      default:
      // do nothing
    }
  };

  const registerAttendances = async () => {
    //出欠情報登録機能
    const votes = possibleDates.map((possibleDate) => possibleDate.vote);
    const attendeesData = {
      name: props.location.state.name,
      votes: votes,
      comment: props.location.state.comment,
    };
    // 出欠情報をRealTimeDatabaseに登録
    firebaseDb
      .ref(`events/${props.location.state.eventId}/attendees`)
      .push(attendeesData);

    props.history.push(`/event/${props.location.state.eventId}`);
  };

  return (
    // <div className={scrollCheck ? classes.scrollOn : classes.scrollOff}>
    <div>
      <Grid
        container
        item
        direction="column"
        justify="center"
        alignItems="center"
        xs={12}
        spacing={4}
      >
        <Grid
          container
          item
          style={{ width: "375px", height: "400px" }}
          // className={classes.scrollOff}
        >
          <StickyTable
            stickyHeaderCount={1}
            borderWidth={0}
            leftStickyColumnCount={0}
          >
            <Row>
              {props.location.state.event.dates.map((date) => (
                <Cell key={date}>{date}</Cell>
              ))}
            </Row>
            {props.location.state.event.times.map((time, i) => (
              <Row key={time}>
                {props.location.state.event.dates.map((date, j) => (
                  <Cell key={date}>
                    <ThemeProvider
                      theme={checkColor(
                        possibleDates[
                          j * props.location.state.event.times.length + i
                        ].vote
                      )}
                    >
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() =>
                          handleClickChange(
                            possibleDates[
                              j * props.location.state.event.times.length + i
                            ]
                          )
                        }
                        // onTouchEnd={() => console.log("Button touched.")}
                        // onTouchStart={() => console.log("Button touche.")}
                      >
                        {time}
                      </Button>
                    </ThemeProvider>
                  </Cell>
                ))}
              </Row>
            ))}
          </StickyTable>
        </Grid>

        <Grid
          container
          item
          direction="column"
          justify="center"
          alignItems="center"
          xs={12}
          spacing={5}
        ></Grid>
        <Grid
          container
          item
          direction="row"
          justify="center"
          alignItems="center"
          xs={12}
          spacing={5}
        >
          <Grid item xs={4}>
            <ThemeProvider theme={redtheme}>
              <Button
                variant={redVarient}
                color="primary"
                onClick={() => handleClickRed()}
              >
                ○
              </Button>
            </ThemeProvider>
          </Grid>
          <Grid item xs={4}>
            <ThemeProvider theme={greentheme}>
              <Button
                variant={greenVarient}
                color="primary"
                onClick={() => handleClickGreen()}
              >
                △
              </Button>
            </ThemeProvider>
          </Grid>
          <Grid item xs={4}>
            <ThemeProvider theme={bluetheme}>
              <Button
                variant={blueVarient}
                color="primary"
                onClick={() => handleClickBlue()}
              >
                ×
              </Button>
            </ThemeProvider>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => registerAttendances()}
          >
            出欠を回答する
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default InputDates;

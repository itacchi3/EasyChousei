import React, { useEffect, useState } from "react";
import { StickyTable, Row, Cell } from "react-sticky-table";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import {
  withStyles,
  createMuiTheme,
  ThemeProvider,
  makeStyles,
} from "@material-ui/core/styles";
import { green, red, blue } from "@material-ui/core/colors";
import { firebaseApp } from "./config/firebase";
import { attendeesObjectToArray } from "./DataConvert";

const firebaseDb = firebaseApp.database();

const useStyles = makeStyles({
  footer: {
    paddingTop: 40,
  },
});

const redtheme = createMuiTheme({
  palette: {
    primary: {
      main: red[500],
    },
  },
});
const greentheme = createMuiTheme({
  palette: {
    primary: {
      main: green[500],
    },
  },
});
const bluetheme = createMuiTheme({
  palette: {
    primary: {
      main: blue[500],
    },
  },
});

const InputDates = (props) => {
  const classes = useStyles();

  const [color, setColor] = useState("Green");
  const [possibleDates, setPossibleDates] = useState(
    props.location.state.event.prospectiveDates.map((date) => {
      return {
        date: date,
        vote: "△",
      };
    })
  );

  const checkColor = (vote) => {
    switch (vote) {
      case "o":
        return redtheme;
      case "△":
        return greentheme;
      case "x":
        return bluetheme;
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
    setColor("Red");
  };

  const handleClickGreen = () => {
    setColor("Green");
  };

  const handleClickBlue = () => {
    setColor("Blue");
  };

  const handleClickChange = (possibleDate) => {
    switch (color) {
      case "Red":
        onSelectVote(possibleDate.date, "o");
        break;
      case "Green":
        onSelectVote(possibleDate.date, "△");
        break;
      case "Blue":
        onSelectVote(possibleDate.date, "x");
        break;
    }
  };

  const registerAttendances = async () => {
    // 2-6.出欠情報登録機能を追加しよう
    const votes = possibleDates.map((possibleDate) => possibleDate.vote);
    const attendeesData = {
      name: props.location.state.name,
      votes: votes,
      comment: props.location.state.comment,
    };
    // 出欠情報をRealTimeDatabaseに登録しましょう
    firebaseDb
      .ref(`events/${props.location.state.eventId}/attendees`)
      .push(attendeesData);

    props.history.push(`/event/${props.location.state.eventId}`);
  };

  return (
    <div>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        xs={12}
        spacing={4}
      >
        <Grid container item style={{ width: "375px", height: "600px" }}>
          <StickyTable
            stickyHeaderCount={1}
            borderWidth={0}
            leftStickyColumnCount={0}
          >
            <Row>
              {props.location.state.event.dates.map((date) => (
                <Cell>{date}</Cell>
              ))}
            </Row>
            {props.location.state.event.times.map((time, i) => (
              <Row>
                {props.location.state.event.dates.map((date, j) => (
                  <Cell>
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
          <Grid
            item
            direction="row"
            justify="center"
            alignItems="center"
            xs={4}
            spacing={2}
          >
            <ThemeProvider theme={redtheme}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleClickRed()}
              >
                o
              </Button>
            </ThemeProvider>
          </Grid>
          <Grid
            item
            direction="row"
            justify="center"
            alignItems="center"
            xs={4}
            spacing={2}
          >
            <ThemeProvider theme={greentheme}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleClickGreen()}
              >
                △
              </Button>
            </ThemeProvider>
          </Grid>
          <Grid
            item
            direction="row"
            justify="center"
            alignItems="center"
            xs={4}
            spacing={2}
          >
            <ThemeProvider theme={bluetheme}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleClickBlue()}
              >
                x
              </Button>
            </ThemeProvider>
          </Grid>
        </Grid>
        <Grid item justify="center" alignItems="center" xs={12} spacing={4}>
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

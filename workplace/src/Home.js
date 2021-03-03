import React, { useState } from "react";
import { Link } from "react-router-dom";
import { firebaseApp } from "./config/firebase";
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

import "./Home.css";

const firebaseDb = firebaseApp.database();

const Home = (props) => {
  const [input, setInput] = useState("");
  const [outPut, setOutPut] = useState("");

  // const onClick = async () => {
  //   const testKey = await firebaseDb.ref("test").push(input).key;
  //   firebaseDb.ref(`test/${testKey}`).on("value", (snapshot) => {
  //     setOutPut(snapshot.val());
  //   });
  // };

  return (
    <Grid
      container
      item
      direction="column"
      id="home"
      justify="space-evenly"
      alignItems="center"
      xs={8}
    >
      {/* <Grid container item className="guide-message" xs={12}>
        <div>実験!</div>
        <div>
          このページが表示されているということは"npm start"に成功していますね。
        </div>
        <div>
          次はデータベースとの接続を確認してみましょう。
          <br />
          以下のフォームに何かを入力してから送信ボタンを押してください。
        </div>
        <TextField
          value={input}
          onChange={(e) => setInput(e.target.value)}
          fullWidth={true}
          variant="outlined"
        />
      </Grid> */}
      {/* <Grid
        container
        item
        className="button-area"
        alignItems="center"
        justify="center"
        xs={12}
      >
        <Grid item>
          <Button variant="contained" color="primary" onClick={() => onClick()}>
            送信する
          </Button>
        </Grid>
      </Grid> */}

      <Grid
        container
        item
        className="message-area"
        direction="column"
        alignItems="flex-start"
        justify="space-between"
        xs={12}
      >
        {/* <Grid item>
          <div className="output-message-area">{outPut}</div>
          <div>
            入力した値が表示されれば接続成功です。
            <br />
            以下のリンクからイベント登録画面に進んでください。
          </div>
        </Grid> */}
        <Grid item>
          <Link to="/event">イベント登録</Link>
        </Grid>
      </Grid>
      <hr />
    </Grid>
  );
};

export default Home;

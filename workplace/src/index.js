import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

ReactDOM.render(<App />, document.getElementById("root"));

// ReactDOM.render(<App />, document.getElementById('root')); の記述があると思いますが、
// これはid='root'の要素の中に<App />という要素を入れ込むという意味です。ここで<App />は src/App.jsのことを指しています。
// つまり、src/App.js に書いた記述がブラウザ上のページ(index.html)に反映される状態になっています。

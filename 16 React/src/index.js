import React from "react";
import ReactDOM from "react-dom";

const name = "yena";
let today = new Date();

ReactDOM.render(
  <div>
    <p>Created by {name}</p>
    <p>Copyright {today.getFullYear()}</p>
  </div>,
  document.getElementById("root")
);

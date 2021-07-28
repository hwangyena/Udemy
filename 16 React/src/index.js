import React from "react";
import ReactDom from "react-dom";

const date = new Date();
const hour = date.getHours();
let greeting;
let colorHead = { color: "red" };

if (hour >= 0 && hour < 12) {
  greeting = "Good morning";
} else if (hour >= 12 && hour < 18) {
  greeting = "Good Afternoon";
  colorHead.color = "green";
} else {
  greeting = "Good evening";
  colorHead.color = "blue";
}

ReactDom.render(
  <div>
    <h1 style={colorHead} className="heading">
      {greeting}
    </h1>
  </div>,
  document.getElementById("root")
);

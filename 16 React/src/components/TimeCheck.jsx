import React from "react";

function TimeCheck() {
  setInterval(setTime, 1000); //1sec마다 함수 호출

  let time = new Date().toLocaleTimeString();
  const [currentTime, updateTime] = React.useState(time);
  // updateTime(time);

  function setTime() {
    updateTime(new Date().toLocaleTimeString());
  }

  return (
    <div className="container">
      <h1>{currentTime}</h1>
      <button onClick={setTime}>Get Time</button>
    </div>
  );
}

export default TimeCheck;

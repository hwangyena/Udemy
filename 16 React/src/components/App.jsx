import React, { useState } from "react";

function App() {
  const [headingText, setHeadingText] = useState("hello");
  const [mouse, setMouse] = useState("#fff");

  function handleClick() {
    setHeadingText("Submitted");
  }

  return (
    <div className="container">
      <h1>{headingText}</h1>
      <input type="text" placeholder="What's your name?" />
      <button
        style={{ backgroundColor: mouse }}
        onClick={handleClick}
        onMouseOut={() => setMouse("#fff")}
        onMouseOver={() => setMouse("#000")}
      >
        Submit
      </button>
    </div>
  );
}

export default App;

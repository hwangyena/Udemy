import React from "react";
import Emoji from "./Emoji";
import emojipedia from "../emojipedia";

function InsertEmj(emj) {
  return <Emoji emoji={emj.emoji} name={emj.name} meaning={emj.meaning} />;
}

function App() {
  return (
    <div>
      <h1>
        <span>emojipedia</span>
      </h1>

      <dl className="dictionary">{emojipedia.map(InsertEmj)}</dl>
    </div>
  );
}

export default App;

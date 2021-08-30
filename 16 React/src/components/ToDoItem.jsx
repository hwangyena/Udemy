import React, { useState } from "react";

function ToDoItem(props) {
  const [underLine, setUnderLine] = useState("none");

  function handleClick(event) {
    setUnderLine(underLine == "none" ? "line-through" : "none");
  }

  return (
    <div>
      <li onClick={handleClick} style={{ textDecoration: underLine }}>
        {props.text}
      </li>
    </div>
  );
}

export default ToDoItem;

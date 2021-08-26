import React, { useState } from "react";

function App() {
  const [inputText, setInputText] = useState("");
  const [item, setItem] = useState([]);

  function handleTodoList(event) {
    const value = event.target.value;
    setInputText(value);
  }

  function addTodoList() {
    setItem((prev) => {
      return [...prev, inputText];
    });

    //item 추가후 text 비우기
    setInputText("");
  }

  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <div className="form">
        <input
          type="text"
          name="inputText"
          onChange={handleTodoList}
          value={inputText}
        />
        <button onClick={addTodoList}>
          <span>Add</span>
        </button>
      </div>
      <div>
        <ul>
          {item.map((i) => (
            <li>{i}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;

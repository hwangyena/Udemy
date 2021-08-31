import React, { useState } from "react";

function PlusNote(props){
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  function handleClick(event){
    event.preventDefault();
  }

  function handleTitle(event){
    const titleValue = event.target.value;
    setTitle(titleValue);
  }

  function handleContent(event){
    const contentValue = event.target.value;
    setContent(contentValue);
  }

  return (
    <div>
        <form onSubmit={handleClick}>
          <input name="title" placeholder="title..." onChange={handleTitle} value={title}/>
          <textarea
            name="content"
            placeholder="Take a note...."
            rows="4"
            onChange={handleContent}
            value={content}
          />
          <button onClick={()=>{
            props.clickEvent(title, content);
            setTitle("");
            setContent("");
          }}>
          Add
          </button>
        </form>
    </div>
  )
}

export default PlusNote;

import React, { useState } from "react";

function PlusNote(props){
  const [createNote, setCreateNote] = useState({
    title: "",
    content: ""
  })

  function handleClick(event){
    event.preventDefault();
  }

  function handleNote(event){
    const {name, value} = event.target;

    setCreateNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      }
    })
  }

  return (
    <div>
        <form onSubmit={handleClick}>
          <input name="title" placeholder="title..." onChange={handleNote} value={createNote.title}/>
          <textarea
            name="content"
            placeholder="Take a note...."
            rows="4"
            onChange={handleNote}
            value={createNote.content}
          />
          <button onClick={()=>{
            props.clickEvent(createNote);
            setCreateNote({title:"", content:""})
          }}>
          Add
          </button>
        </form>
    </div>
  )
}

export default PlusNote;

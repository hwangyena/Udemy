import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";
import Collapse from "@material-ui/core/Collapse";

function PlusNote(props){
  /*Note*/
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

  /*check*/
  const [checked, setChecked] = useState(false);


  return (
    <div>
        <form className="create-note" onSubmit={handleClick} onFocus={()=>{setChecked(true);}} onBlur={()=>{setChecked(false);}}>
          <input
            name="title"
            placeholder="title..."
            onChange={handleNote}
            value={createNote.title}
          />
          <Collapse in={checked}>
            <textarea
              name="content"
              placeholder="Take a note...."
              rows="4"
              onChange={handleNote}
              value={createNote.content}
            />

            <Zoom in={checked}>
              <Fab onClick={()=>{
                props.clickEvent(createNote);
                setCreateNote({title:"", content:""})
              }}>
                <AddIcon/>
              </Fab>
            </Zoom>
          </Collapse>
        </form>
    </div>
  )
}

export default PlusNote;

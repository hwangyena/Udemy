import React, { useState } from "react"
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import PlusNote from "./PlusNote";
import { v4 as uuidv4 } from 'uuid';


function App(){
  const [noteList, setNoteList] = useState([{
    title:"It is sample title",
    content: "It is sample contents"
  }]);

  function addNote(inputNote){
    setNoteList((prevNote)=>{
      return [...prevNote, inputNote]
    });
  }

  function deleteNote(id){
    setNoteList((prevNote)=>{
      return prevNote.filter((element, index)=>{
        return index !== id});
    })
  }

  return (
      <div>
          <Header/>
          <PlusNote clickEvent={addNote}/>
          {noteList.map((noteList, index)=>
            <Note
              key={uuidv4()}
              id={index}
              title={noteList.title}
              content={noteList.content}
              buttonEvent={deleteNote}
            />
          )}
          <Footer/>
      </div>
  );
}

export default App;

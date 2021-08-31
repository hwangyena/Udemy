import React, { useState } from "react"
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import PlusNote from "./PlusNote";
// import { v4 as uuidv4 } from 'uuid';


function App(){
  const [noteList, setNoteList] = useState([{
    title:"It is sample title",
    content: "It is sample contents"
  }]);

  function addNote(inputTitle, inputContent){
    setNoteList((prevNote)=>{
      return [...prevNote, {title: inputTitle, content: inputContent}]
    });
  }

  function deleteNote(key){
    setNoteList((prevNote)=>{
      return prevNote.filter((element, idx)=>{return idx!==key});
    })
  }

  return (
      <div>
          <Header/>
          <PlusNote clickEvent={addNote}/>
          {noteList.map((noteList, index)=>
            <Note
              key={index}
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

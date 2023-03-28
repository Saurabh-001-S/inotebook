import { useState } from "react";
import NoteContext from "./notesContext";

const NotesState = (props) => {
      const host = "http://localhost:5000"
      const auth_Token = localStorage.getItem('token');
      const notesInitial = []
      const [notes, setNotes] = useState(notesInitial)

      // Gets Notes 
      const getNotes = async () => {
            //API CAlls
            const response = await fetch(`${host}/api/notes/fetchallnotes`, {
                  method: 'GET',
                  header: {
                        'Content-Type': 'application/json',
                        "authToken": `${auth_Token}`
                  }
            })
            const json = await response.json();
            console.log(json)
            // setNotes(json)
      }

      // Add Notes 
      const addNote = async (title, description, tag) => {
            //API CAlls
            const response = await fetch(`${host}/api/notes/addnote`, {
                  method: 'POST',
                  header: {
                        'Content-Type': 'application/json',
                        "authToken": `${auth_Token}`
                  },
                  body: JSON.stringify({ title, description, tag })
            })
            const json = await response.json();

            //Adding a Note
            const randomId = function (length = 6) {
                  return Math.random().toString(36).substring(2, length + 2);
            };
            const note = {
                  "_id": randomId(12),
                  "user": "fghd49df1g317s316f165fg8d",
                  "title": title,
                  "description": description,
                  "tag": tag,
                  "date": "2021-09-03T14:20;09.5092",
                  "_v": 0
            }
            setNotes(notes.concat(note))
            console.log(note)
      }

      // Delete Notes 
      const deleteNote = async (id) => {
            //API CAlls
            const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
                  method: 'DELETE',
                  header: {
                        'Content-Type': 'application/json',
                        "authToken": `${auth_Token}`
                  }
            })
            const json = await response.json();
            console.log(json)

            const newNotes = notes.filter((note) => { return note._id !== id })
            setNotes(newNotes)
      }

      // Edit Notes 
      const editNote = async (id, title, description, tag) => {
            //API CAlls
            const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
                  method: 'POST',
                  header: {
                        'Content-Type': 'application/json',
                        "authToken": `${auth_Token}`
                  },
                  body: JSON.stringify({ title, description, tag })
            })
            const json = await response.json();
            console.log(json);
            setNotes(json)

            //Login to Edit
            let newNotes = JSON.parse(JSON.stringify(notes))
            for (let i = 0; i < newNotes.length; i++) {
                  const element = newNotes[i];
                  if (element._id === id) {
                        newNotes[i].title = title;
                        newNotes[i].description = description;
                        newNotes[i].tag = tag;
                        break;
                  }
                  setNotes(newNotes);
            }
      }

      return (
            <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }} >
                  {props.children}
            </NoteContext.Provider>
      )
}
export default NotesState;
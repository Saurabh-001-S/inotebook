import React, { useContext, useState } from 'react'
import notesContext from "../context/notes/notesContext"
const AddNote = (props) => {

      const context = useContext(notesContext)
      const { addNote } = context;
      const [note, setNote] = useState({ title: "", description: "", tag: "" })

      const handleClick = (e) => {
            e.preventDefault();
            addNote(note.title, note.description, note.tag);
            setNote({ title: "", description: "", tag: "" })
            props.showAlert("Note is addes successfully", "success")
      }

      const onChange = (e) => {
            setNote({ ...note, [e.target.name]: e.target.value })
      }

      return (
            <div className="conatiner my-3">
                  <h2>Add Note</h2>
                  <form>
                        <div className="mb-3 ">
                              <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                              <input onChange={onChange} type="email" className="form-control" id="title" value={note.title} name='title' aria-describedby="emailHelp" minLength={5} required />
                        </div>
                        <div className="mb-3">
                              <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                              <input onChange={onChange} type="text" className="form-control" id="description" value={note.description} name='description' minLength={5} required />
                        </div>
                        <div className="mb-3">
                              <label htmlFor="exampleInputPassword1" className="form-label">Tag</label>
                              <input onChange={onChange} type="text" className="form-control" id="tag" value={note.tag} name='tag' minLength={3} required />
                        </div>
                        <button disabled={note.title.length < 5 || note.description.length < 5} onClick={handleClick} type="submit" className="btn btn-primary">Submit</button>
                  </form>
            </div>
      )
}

export default AddNote

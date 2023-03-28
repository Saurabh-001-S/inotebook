import React, { useContext, useEffect, useRef, useState } from 'react'
import notesContext from "../context/notes/notesContext"
import AddNote from './AddNote';
import NoteItem from './NoteItem';

const Notes = (props) => {
      const context = useContext(notesContext)
      const { notes, editNote, getNotes } = context;
      const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })
      const ref = useRef(null)
      const refClose = useRef(null)

      useEffect(() => {
            if (localStorage.getItem('token')) {
                  getNotes()
            }
      })
      const updateNote = (currentNote) => {
            ref.current.click();
            setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
      }

      const handleClick = (e) => {
            editNote(note.id, note.etitle, note.edescription, note.etag);
            refClose.current.click();
            props.showAlert("Note is updates successfully", "success")
      }

      const onChange = (e) => {
            setNote({ ...note, [e.target.name]: e.target.value })
      }

      return (
            <>
                  <AddNote showAlert={props.showAlert} />
                  <button type="button" ref={ref} className="btn btn-primary visually-hidden" data-bs-toggle="modal" data-bs-target="#exampleModal">
                  </button>
                  <div className="modal fade text-dark" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                              <div className="modal-content">
                                    <div className="modal-header">
                                          <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                                          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                          <form>
                                                <div className="mb-3 ">
                                                      <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                                                      <input onChange={onChange} type="email" className="form-control" id="etitle" name='etitle' value={note.etitle} aria-describedby="emailHelp" minLength={5} required />
                                                </div>
                                                <div className="mb-3">
                                                      <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                                                      <input onChange={onChange} type="text" className="form-control" id="edescription" value={note.edescription} name='edescription' minLength={5} required />
                                                </div>
                                                <div className="mb-3">
                                                      <label htmlFor="exampleInputPassword1" className="form-label">Tag</label>
                                                      <input onChange={onChange} type="text" className="form-control" id="etag" value={note.etag} name='etag' minLength={5} required />
                                                </div>
                                          </form>

                                    </div>

                                    <div className="modal-footer">
                                          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={refClose}>Close</button>
                                          <button type="button" className="btn btn-primary" disabled={note.etitle.length < 5 || note.edescription.length < 5} onClick={handleClick}>Update Note</button>
                                    </div>
                              </div>
                        </div>
                  </div>

                  <div className="row my-3">
                        {notes.map((note) => {
                              return <NoteItem key={note._id} showAlert={props.showAlert} updateNote={updateNote} note={note} />
                        })}
                  </div>
            </>
      )
}

export default Notes

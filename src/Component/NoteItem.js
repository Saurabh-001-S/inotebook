import React, { useContext } from 'react'
import notesContext from "../context/notes/notesContext"

const NoteItem = (props) => {
      const context = useContext(notesContext)
      const { deleteNote } = context;
      const { note, updateNote } = props;
      return (
            <div className="col-md-3">
                  <div className="card my-3">
                        <div className="card-header text-dark d-flex " style={{ justifyContent: "space-between" }} >
                              <div>  Notes</div>
                              <div >
                                    <i className="fa-solid fa-trash mx-2 "
                                          onClick={() => { deleteNote(note._id); props.showAlert("Deleted successfully", "success") }} >
                                    </i>
                                    <i className="fa-sharp fa-solid fa-pen-to-square mx-2"
                                          onClick={() => { updateNote(note) }}  >
                                    </i>
                              </div>
                        </div>
                        <div className="card-body text-dark">
                              <h5 className="card-title"> {note.title}</h5>
                              <p className="card-text">  {note.description}</p>
                        </div>
                  </div>
            </div>
      )
}

export default NoteItem

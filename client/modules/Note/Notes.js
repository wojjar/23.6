import React, {PropTypes } from 'react'
import Note from './Note';
import styles from './Notes.css';
import { URL } from 'url';
import Edit from '../../components/Edit'

const Notes = ({notes, laneId, editNote, updateNoteRequest, deleteNoteRequest}) => {
    console.log('notes, ', notes)
    return (
        <ul className="notes">
            {
                notes.map(note => {
                    console.log('note: ', note)
                    return (
                    <Note id={note.id} key={note.id} editing={note.editing}>
                        <Edit 
                            editing={note.editing}
                            value={note.task}
                            onValueClick={() => editNote(note.id)}
                            onUpdate={(task) => updateNoteRequest({
                                ...note,
                                task,
                                editing:false
                            })}
                            onDelete = {() => deleteNoteRequest(note.id, laneId)}
                        />
                    </Note>
)                })
            }
        </ul>
    )
}

Notes.propTypes = {
    notes: PropTypes.array,
    updateNote: PropTypes.func,
    deleteNote: PropTypes.func,
    laneId: PropTypes.string,
    editNote: PropTypes.func
}

export default Notes;
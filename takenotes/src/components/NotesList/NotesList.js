import React from 'react';
import './NotesList.css';

export const NotesList = props => {
  console.log(props);
  return (
    <div className='notes-list-wrap'>
      <h4>Notes</h4>
      <div className='notes-map'>
      {props.notes.map(note => (
        <div className='note-box' key={note.id} onClick={() => props.history.push(`/notes/${note.id}`)}>
          <h3 className='note-title'>
            {note.title}
          </h3>
          <p className='note-body'>{note.content}</p>
        </div>
      ))}
      </div>
    </div>
  )
}
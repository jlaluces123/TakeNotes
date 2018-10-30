import React from 'react';

export const NotesList = props => {
  console.log(props);
  return (
    <div className='notes-list-wrap'>
      <h4>Lets get studying!</h4>
      <div className='notes-map'>
      {props.notes.map(note => (
        <div className='note-box' key={note.id}>
          <h3 className='note-title'onClick={() => props.history.push(`/notes/${note.id}`)}>
            {note.title}
          </h3>
          <p className='note-body'>{note.content}</p>
        </div>
      ))}
      </div>
    </div>
  )
}
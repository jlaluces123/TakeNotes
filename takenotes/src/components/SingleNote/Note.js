
import React from 'react';
import Popup from 'reactjs-popup';
import './Note.css';

export const Note = props => {
  const note = props.notesList.find(
    note => note.id === Number(props.match.params.noteId)
  );
  console.log('note', note);
  console.log('props', props);

  const handleDelete = () => {
    props.handleDeleteNote(note.id);
    props.history.push('/note-form');
  }

  return (
    <div className='single-note-wrap'>
      <nav>
        <button className='edit-button' onClick={event => {
          event.preventDefault();
          props.goToUpdateNoteForm(event, note.id);
        }}
        >edit</button>        
        <Popup trigger={<button className='delete-button'>delete</button>} modal>
          {close => (
            <div className='open-modal'>
              <p className='modal-text'>Are you sure you want to delete this?</p>
              <div className='handle-modal-buttons'>
                <button className='delete-inside-modal' onClick={handleDelete}>DELETE</button>
                <button 
                className='cancel-inside-modal'
                onClick={() => {
                  console.log('modal closed?');
                  close()
                }}>
                  NO  
                </button>
              </div>              
            </div>
          )}
        </Popup>
      </nav>   
      {note ?
      <div className='note-div'>      
        <h3>{note.title}</h3> 
        <p className='note-paragraph'>{note.content}</p>
      </div>
        
        : 
        
      <p>Loading...</p>     
     }        
    </div>
  )
}
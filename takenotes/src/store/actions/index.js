import axios from 'axios';

export const FETCHING_NOTES = 'FETCHING_NOTES';
export const SUCCESS_FETCHING_NOTES = 'SUCCESS_FETCHING_NOTES';
export const FAIL_FETCHING_NOTES = 'FAIL_FETCHING_NOTES';

export const START_ADD_NOTE = 'START_ADD_NOTE';
export const SUCCESS_ADD_NOTE = 'SUCCESS_ADD_NOTE';
export const FAILURE_ADD_NOTE = 'FAILURE_ADD_NOTE';

export const START_UPDATE_NOTE = 'START_UPDATE_NOTE';
export const SUCCESS_UPDATE_NOTE = 'SUCCESS_UPDATE_NOTE';
export const FAILURE_UPDATE_NOTE = 'FAILURE_UPDATE_NOTE';

export const SET_UPDATE_NOTE = 'SET_UPDATE_NOTE';

export const fetchNotes = () => {
  return dispatch => {
    dispatch({ type: FETCHING_NOTES });

    axios.get('http://localhost:5000/api/notes/')
      .then(response => {
        dispatch({ type: SUCCESS_FETCHING_NOTES, payload: response.data })
      })
      .catch(err => dispatch({ type: FAIL_FETCHING_NOTES, payload: err }));
  };
};

export const addNote = note => dispatch => {
  dispatch({ type: START_ADD_NOTE });

  axios.post('http://localhost:5000/api/notes/', note)
    .then(response => {
      console.log('response:', response)
      dispatch({ type: SUCCESS_ADD_NOTE, payload: {...note, id: response.data.success} })
    })
    .catch(err => {
      dispatch({ type: FAILURE_ADD_NOTE, payload: err });
    })
};

export const setUpdateNote = id => {
  return {
    type: SET_UPDATE_NOTE,
    payload: id
  };
};

export const updateNote = note => dispatch => {
  dispatch({ type: START_UPDATE_NOTE })

  axios.put(`http://localhost:5000/api/notes/${note.id}`, note)
    .then(response => {
      dispatch({ type: SUCCESS_UPDATE_NOTE, payload: note })
    })
    .catch(err => {
      dispatch({ type: FAILURE_UPDATE_NOTE, payload: err })
    });
}
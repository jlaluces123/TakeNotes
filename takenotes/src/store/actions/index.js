import axios from 'axios';

export const FETCHING_NOTES = 'FETCHING_NOTES';
export const SUCCESS_FETCHING_NOTES = 'SUCCESS_FETCHING_NOTES';
export const FAIL_FETCHING_NOTES = 'FAIL_FETCHING_NOTES';

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
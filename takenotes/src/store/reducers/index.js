import {
  FETCHING_NOTES,
  SUCCESS_FETCHING_NOTES,
  FAIL_FETCHING_NOTES,
} from '../actions/index.js';

const initialState = {
  notes: [],
  fetchingNotes: false,
  addingNote: false,
  noteToUpdate: null, // noteToUpdate
  deletingNote: false, // isDeleting in lecture
  error: '',
  isUpdating: false,
};

export const notesReducer = (state = initialState, action) => {
  switch(action.type) {

    case FETCHING_NOTES:
      return {...state, fetchingNotes: true};

    case SUCCESS_FETCHING_NOTES:
      return {...state, fetchingNotes: false, notes: action.payload};

    case FAIL_FETCHING_NOTES:
      return {...state, fetchingNotes: false, error: action.payload};    

  };
};
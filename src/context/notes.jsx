import React, { createContext, useReducer } from "react";
import { postsFetch, createFetch } from "../API/fetchAPI";

export const NoteContext = createContext();

const ADD_NOTE = "ADD_NOTE";
const EDIT_NOTE = "EDIT_NOTE";

const addNoteAC = payload => ({
  type: ADD_NOTE,
  payload
});

const editNoteAC = payload => ({
  type: EDIT_NOTE,
  payload
});

const initialState = {
  notes: []
};

function reducer(state, { type, payload }) {
  switch (type) {
    case ADD_NOTE:
      return {
        ...state,
        notes: [...state.notes, payload]
      };
    case EDIT_NOTE:
      return {
        ...state
      };
    default:
      return state;
  }
}

export const NoteContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addNote = note => dispatch(addNoteAC(note));

  return (
    <NoteContext.Provider value={{ ...state, addNote }}>
      {children}
    </NoteContext.Provider>
  );
};

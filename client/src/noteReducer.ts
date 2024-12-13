import { Action, Note } from './types';

export const NoteReducer = (
  initialState: Note[] = [],
  action: Action
): Note[] => {
  switch (action.type) {
    case '[Note] Add Note':
      return [action.payload, ...initialState];

    case '[Note] All Notes':
      return [...action.payload];

    case '[Note] Update Note':
      const { id, updatedNote } = action.payload;
      return initialState.map((Note) => {
        if (Note.id === id) {
          return {
            ...updatedNote,
          };
        }
        return Note;
      });

    case '[Note] Delete Note':
      return initialState.filter((Note) => Note.id !== action.payload); 

    default:
      return initialState;
  }
};

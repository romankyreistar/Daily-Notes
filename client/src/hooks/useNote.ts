import { useReducer, useEffect } from 'react';
import { NoteReducer } from '../noteReducer';
import { Note } from '@/types';
import {
  createNote,
  updateNote,
  deleteNote,
  getAllNotes,
} from '@/api/notesApi';

// Reducer params
const initialState: Note[] = [];

export const useNote = () => {
  const [notes, dispatch] = useReducer(NoteReducer, initialState);

  useEffect(() => {
    // Fetch notes from the API when the component mounts
    const fetchNotes = async () => {
      try {
        const response = await getAllNotes();
        if (response.success)
          dispatch({ type: '[Note] All Notes', payload: response.data });
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };

    fetchNotes();
  }, []);

  // Handle adding a new note
  const handleNewNote = async (newNote: FormData) => {
    try {
      const response = await createNote(newNote);
      dispatch({
        type: '[Note] Add Note',
        payload: response.data,
      });
    } catch (error) {
      console.error('Error creating note:', error);
    }
  };

  // Handle updating an existing note
  const handleUpdateNote = async (id: number, updatedNote: Note) => {
    try {
      const response = await updateNote(updatedNote);
      dispatch({
        type: '[Note] Update Note',
        payload: { id, updatedNote: response.data },
      });
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  // Handle deleting a note
  const handleDeleteNote = async (id: number) => {
    try {
      await deleteNote(id);
      dispatch({
        type: '[Note] Delete Note',
        payload: id,
      });
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  // Handle toggling completed state of a note
  const handleCompleteToggle = async (id: number) => {
    try {
      const updatedNote = notes.find((note) => note.id === id);
      if (!updatedNote) return;
      const response = await updateNote({
        ...updatedNote,
        isCompleted: !updatedNote.isCompleted,
      });
      dispatch({
        type: '[Note] Update Note',
        payload: { id, updatedNote: response.data },
      });
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  // Handle toggling important state of a note
  const handleImportantToggle = async (id: number) => {
    try {
      const updatedNote = notes.find((note) => note.id === id);
      if (!updatedNote) return;
      const response = await updateNote({
        ...updatedNote,
        isImportant: !updatedNote.isImportant,
      });
      dispatch({
        type: '[Note] Update Note',
        payload: { id, updatedNote: response.data },
      });
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  return {
    notes,
    handleNewNote,
    handleUpdateNote,
    handleDeleteNote,
    handleCompleteToggle,
    handleImportantToggle,
    NotesCount: notes.length,
    NotesCompleted: notes.filter((note) => note.isCompleted).length,
    NotesPending: notes.filter((note) => !note.isCompleted).length,
  };
};

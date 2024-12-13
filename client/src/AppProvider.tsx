import React from 'react';
import { createContext, useState } from 'react';
import { useTheme } from './hooks/useTheme';
import { useNote } from './hooks/useNote';

export const AppContext = createContext<any>(null);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const { theme, handleSwitchTheme } = useTheme();

  // Note Management
  const {
    notes,
    handleNewNote,
    handleUpdateNote,
    handleDeleteNote,
    handleCompleteToggle,
    handleImportantToggle,
    NotesCount,
    NotesCompleted,
    NotesPending,
  } = useNote();

  // Note Modal
  const [showModal, setShowModal] = useState(false);
  const [deleteNote, setDeleteNote] = useState(false);
  const [selectedNote, setSelectedNote] = useState<string | null>(null);

  const handleModalVisible = () => {
    !showModal ? setShowModal(true) : setShowModal(false);
    setSelectedNote(null);
    setDeleteNote(false);
  };

  const onDelete = (Note: string) => {
    setSelectedNote(Note);
    setShowModal(true);
    setDeleteNote(true);
  };

  const handleEditNote = (Note: string) => {
    setSelectedNote(Note);
    setShowModal(true);
  };

  const value = {
    theme,
    handleSwitchTheme,
    notes,
    handleNewNote,
    handleUpdateNote,
    handleDeleteNote,
    handleCompleteToggle,
    handleImportantToggle,
    NotesCount,
    NotesCompleted,
    NotesPending,
    showModal,
    setShowModal,
    deleteNote,
    setDeleteNote,
    selectedNote,
    setSelectedNote,
    handleModalVisible,
    onDelete,
    handleEditNote,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

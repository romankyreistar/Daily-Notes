import React from 'react';
import { Button } from '../../button/Button';
import { NoteItem } from '../note-item/NoteItem';
import './NoteRoutes.css';
import { Note } from '@/types';

interface TodoProps {
  Notes: Note[];
  handleModalVisible: () => void;
}

export const Todo: React.FC<TodoProps> = ({ Notes, handleModalVisible }) => {
  const todos = Notes.filter((Note) => !Note.isCompleted);

  return (
    <div className='Note-grid animate__animated animate__fadeIn animate__faster'>
      {todos.length === 0 ? (
        <Button
          onClick={handleModalVisible}
          className='add-btn-grid'
          text='Add a Note'
        />
      ) : (
        todos.map((Note) => {
          return <NoteItem key={Note.id} note={Note} />;
        })
      )}
    </div>
  );
};

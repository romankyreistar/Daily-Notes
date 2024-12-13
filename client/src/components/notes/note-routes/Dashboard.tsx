import React from 'react';
import { Note } from '@/types';
import { Button } from '../../button/Button';
import { NoteItem } from '../note-item/NoteItem';
import './NoteRoutes.css';

interface DashboardProps {
  notes: Note[];
  handleModalVisible: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  notes,
  handleModalVisible,
}) => {
  return (
    <div className='Note-grid animate__animated animate__fadeIn animate__faster'>
      {notes.length === 0 ? (
        <Button
          onClick={handleModalVisible}
          className='add-btn-grid'
          text='Add a Note'
        />
      ) : (
        notes.map((Note) => {
          return <NoteItem key={Note.id} note={Note} />;
        })
      )}
    </div>
  );
};

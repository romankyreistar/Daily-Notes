import { Note } from '@/types';
import { Button } from '../../button/Button';
import { NoteItem } from '../note-item/NoteItem';
import './NoteRoutes.css';

interface Props {
  notes: Note[];
  handleModalVisible: () => void;
}

export const Important: React.FC<Props> = ({ notes, handleModalVisible }) => {
  const important = notes.filter((Note) => Note.isImportant);

  return (
    <div className='Note-grid animate__animated animate__fadeIn animate__faster'>
      {important.length === 0 ? (
        <Button
          onClick={handleModalVisible}
          className='add-btn-grid'
          text='Add a Note'
        />
      ) : (
        important.map((Note) => {
          return <NoteItem key={Note.id} note={Note} />;
        })
      )}
    </div>
  );
};

import { Note } from '@/types';
import { NoteItem } from '../note-item/NoteItem';
import './NoteRoutes.css';

interface Props {
  notes: Note[];
}

export const Completed: React.FC<Props> = ({ notes }) => {
  const completed = notes.filter((Note) => Note.isCompleted);

  return (
    <div className='Note-grid animate__animated animate__fadeIn animate__faster'>
      {completed.length === 0 ? (
        <h3 className='empty-msg'>Your list is empty</h3>
      ) : (
        completed.map((Note) => {
          return <NoteItem key={Note.id} note={Note} />;
        })
      )}
    </div>
  );
};

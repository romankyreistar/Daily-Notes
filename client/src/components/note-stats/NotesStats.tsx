import { useContext } from 'react';
import { AppContext } from '@/AppProvider';
import './NotesStats.css';

export const NotesStats = () => {
  const { NotesCount, NotesCompleted, NotesPending } = useContext(AppContext);

  return (
    <div className='stats-wrapper'>
      <h3>Notes stats</h3>
      <div className='stats flex'>
        <h4 className='stats-title'>Total</h4>
        <small className='stats-number'>{NotesCount}</small>
      </div>
      <div className='stats flex'>
        <h4 className='stats-title'>Completed</h4>
        <small className='stats-number'>{NotesCompleted}</small>
      </div>
      <div className='stats flex'>
        <h4 className='stats-title'>Pending</h4>
        <small className='stats-number'>{NotesPending}</small>
      </div>
    </div>
  );
};

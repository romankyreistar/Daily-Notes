import { useContext, useEffect, useState } from 'react';
import { AppContext } from '@/AppProvider';
import { Button } from '@/components';
import { faTrashCan, faClock } from '@fortawesome/free-regular-svg-icons';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Note } from '@/types';
import './NoteItem.css';
import { BASE_URL } from '@/config';

// Icons
const deleteIcon = <FontAwesomeIcon icon={faTrashCan} />;
const editIcon = <FontAwesomeIcon icon={faEllipsisVertical} />;
const clockIcon = <FontAwesomeIcon icon={faClock} />;

export const NoteItem = ({ note }: { note: Note }) => {
  const {
    handleCompleteToggle,
    handleImportantToggle,
    handleEditNote,
    onDelete,
  } = useContext(AppContext);
  const [audioUrl, setAudioUrl] = useState<string | undefined>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (note && note.audio) {
      const fetchAudio = async () => {
        setLoading(true);
        try {
          const response = await fetch(`${BASE_URL}/notes${note.audio}`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${localStorage.getItem(
                'notes_accessToken'
              )}`,
            },
          });

          if (response.ok) {
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            setAudioUrl(url);
          } else {
            console.error('Failed to fetch the audio file');
          }
        } catch (error) {
          console.error('Error fetching audio:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchAudio();
    }
  }, [note]);

  return (
    <div className='Note-item flex' key={note.id}>
      <div className='Note'>
        <h3 className={`Note-title ${note.isCompleted ? 'is-completed' : ''}`}>
          {note.title}
        </h3>
        <p
          className={`Note-description ${
            note.isCompleted ? 'is-completed' : ''
          }`}
        >
          {note.description}
        </p>
      </div>
      {note.audio && !loading && audioUrl && (
        <audio controls style={{ width: '100%' }}>
          <source src={audioUrl} type='audio/wav' />
          Your browser does not support the audio element.
        </audio>
      )}
      {loading && <p>Loading audio...</p>}
      <div className='Note-options flex'>
        <div className='options-left flex'>
          <Button
            onClick={() => handleCompleteToggle(note.id)}
            className={`completed-btn Note-btn ${
              note.isCompleted ? 'is-completed' : ''
            }`}
            text={`${note.isCompleted ? 'Completed' : 'To do'}`}
          />
          <Button
            onClick={() => handleImportantToggle(note.id)}
            className={`priority-btn Note-btn ${
              note.isImportant ? 'is-priority' : ''
            }`}
            text={`Important`}
          />
        </div>
        <div className='options-right flex'>
          <Button
            onClick={() => onDelete(note)}
            className='delete-btn Note-btn'
            text={deleteIcon}
          />
          <Button
            onClick={() => handleEditNote(note, note.id)}
            className='edit-btn Note-btn'
            text={editIcon}
          />
        </div>
      </div>
    </div>
  );
};

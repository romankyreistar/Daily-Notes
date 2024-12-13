import { useContext } from 'react';
import { AppContext } from '@/AppProvider';
import { Button } from '@/components';
import { AddNoteForm } from './add-form/AddNoteForm';
import { EditNoteForm } from './edit-form/EditNoteForm';
import { DeletePrompt } from './delete-form/DeletePrompt';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import './NoteModal.css';

// Icons
const closeIcon = <FontAwesomeIcon icon={faClose} />;

export const NoteModal = () => {
  const { selectedNote, deleteNote, showModal, handleModalVisible } =
    useContext(AppContext);

  let promptDisplay;
  let promptTitle;

  if (selectedNote && !deleteNote) {
    promptTitle = 'Edit Note';
    promptDisplay = <EditNoteForm />;
  } else if (deleteNote) {
    promptTitle = 'Delete this Note?';
    promptDisplay = <DeletePrompt />;
  } else {
    promptTitle = 'Create a Note';
    promptDisplay = <AddNoteForm />;
  }

  return (
    <div className={`Note-modal ${showModal ? 'modal-active' : ''}`}>
      <div className='Note-inner'>
        <div className='Note-inner-header flex'>
          <h2>{promptTitle}</h2>
          <Button
            onClick={handleModalVisible}
            className='close-modal-btn'
            text={closeIcon}
          />
        </div>
        {promptDisplay}
      </div>
    </div>
  );
};

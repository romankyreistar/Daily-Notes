import { useContext } from 'react';
import { AppContext } from '@/AppProvider';
import { Button } from '@/components';

export const DeletePrompt = () => {
  const { selectedNote, handleDeleteNote, handleModalVisible } =
    useContext(AppContext);

  return (
    <div className='delete-box'>
      <Button
        onClick={() => {
          handleDeleteNote(selectedNote.id);
          handleModalVisible();
        }}
        className='delete-confirm-btn'
        text='Delete'
      />
      <Button
        onClick={handleModalVisible}
        className='cancel-btn'
        text='Cancel'
      />
    </div>
  );
};

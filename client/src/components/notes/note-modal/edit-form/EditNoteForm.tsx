import { useContext } from 'react';
import { AppContext } from '@/AppProvider';
import { Button } from '@/components';
import { useForm } from 'react-hook-form';

export const EditNoteForm = () => {
  const { selectedNote, handleUpdateNote, handleModalVisible } =
    useContext(AppContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: selectedNote.title,
      description: selectedNote.description,
      isCompleted: selectedNote.isCompleted,
      isImportant: selectedNote.isImportant,
    },
  });

  const onFormSubmit = (data: any) => {
    if (data.title.length <= 1) return;

    const newNote = {
      id: selectedNote ? selectedNote.id : new Date().getTime(),
      ...data,
    };

    handleUpdateNote(selectedNote.id, newNote);
    reset();
    handleModalVisible();
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className='Note-form flex'>
      <div className='form-block'>
        <label htmlFor='title-input'>Title</label>
        <input
          type='text'
          id='title-input'
          className='title-input form-input'
          {...register('title', { required: true })}
          placeholder='Enter a title'
        />
        {errors.title && <span>Title is required</span>}
      </div>
      <div className='form-block'>
        <label htmlFor='description'>Description</label>
        <textarea
          className='description form-input'
          id='description'
          {...register('description')}
          cols={30}
          rows={10}
          placeholder='Enter a description'
        ></textarea>
      </div>
      <div className='form-block checkbox-wrapper flex'>
        <label htmlFor='completed-btn' className='container'>
          <span>Mark as completed</span>
          <input
            type='checkbox'
            id='completed-btn'
            className='checkbox'
            {...register('isCompleted')}
          />
          <span className='checkmark'></span>
        </label>
      </div>
      <div className='form-block checkbox-wrapper flex'>
        <label htmlFor='important-btn' className='container'>
          <span>Mark as important</span>
          <input
            type='checkbox'
            id='important-btn'
            className='checkbox'
            {...register('isImportant')}
          />
          <span className='checkmark'></span>
        </label>
      </div>
      <Button
        className='add-Note-btn btn-modal'
        text='Edit Note'
        type='submit'
      />
    </form>
  );
};

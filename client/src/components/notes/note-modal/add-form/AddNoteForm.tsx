import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useReactMediaRecorder } from 'react-media-recorder';
import { AppContext } from '@/AppProvider';
import { Button } from '@/components';

export const AddNoteForm = () => {
  const { handleNewNote, handleModalVisible } = useContext(AppContext);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null); // State to store the recorded audio
  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({
      video: false,
      audio: true,
      onStop: (blobUrl: string, blob: Blob) => {
        setAudioBlob(blob);
      },
    });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onFormSubmit = (data: any) => {
    if (data.title.length <= 1) return;

    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('isCompleted', data.isCompleted || false);
    formData.append('isImportant', data.isImportant || false);

    if (audioBlob) {
      formData.append('audio', audioBlob, 'audio-recording.wav');
    }

    handleNewNote(formData);
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
        {errors.title && <span className='error'>Title is required</span>}
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
      <div className='form-block'>
        <label>Audio Record</label>
        <div className='flex flex-col gap-1'>
          <p>Status: {status}</p>
          <div className='flex flex-row gap-1'>
            {status !== 'recording' && (
              <Button
                onClick={startRecording}
                className='add-Note-btn btn-modal'
                text='Start Recording'
              />
            )}
            {status === 'recording' && (
              <Button
                onClick={stopRecording}
                className='add-Note-btn btn-modal'
                text='Stop Recording'
              />
            )}
          </div>

          {mediaBlobUrl && (
            <div>
              <audio controls className='re-audio'>
                <source src={mediaBlobUrl} type='audio/wav' />
                Your browser does not support the audio element.
              </audio>
            </div>
          )}
        </div>
      </div>
      <Button
        className='add-Note-btn btn-modal'
        text='Add Note'
        type='submit'
      />
    </form>
  );
};

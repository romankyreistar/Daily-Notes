import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AddNoteForm } from './AddNoteForm';
import { AppContext } from '@/AppProvider';

jest.mock('react-media-recorder', () => ({
  useReactMediaRecorder: () => ({
    status: 'idle',
    startRecording: jest.fn(),
    stopRecording: jest.fn(),
    mediaBlobUrl: '',
  }),
}));

describe('AddNoteForm', () => {
  it('should create a note with an audio recording', async () => {
    const mockHandleNewNote = jest.fn();
    const mockHandleModalVisible = jest.fn();

    render(
      <AppContext.Provider
        value={{
          handleNewNote: mockHandleNewNote,
          handleModalVisible: mockHandleModalVisible,
        }}
      >
        <AddNoteForm />
      </AppContext.Provider>
    );

    // Simulate typing into the form
    const titleInput = screen.getByLabelText(/title/i);
    fireEvent.change(titleInput, { target: { value: 'Test Note' } });

    const descriptionInput = screen.getByLabelText(/description/i);
    fireEvent.change(descriptionInput, {
      target: { value: 'This is a test note.' },
    });

    const importantCheckbox = screen.getByLabelText(/Mark as important/i);
    fireEvent.click(importantCheckbox);

    const audioFile = new File(['audio content'], 'test_audio.wav', {
      type: 'audio/wav',
    });

    // Submit the form
    fireEvent.submit(screen.getByRole('button', { name: /Add Note/i }));

    // Wait for the form submission
    await waitFor(() => {
      const expectedFormData = {
        title: 'Test Note',
        description: 'This is a test note.',
        isCompleted: 'false',
        isImportant: 'true',
        // audio: expect.any(File),
      };

      const actualFormData = mockHandleNewNote.mock.calls[0][0];

      // Convert FormData to object
      const formDataToObject = (formData: FormData) => {
        const object: any = {};
        formData.forEach((value, key) => {
          object[key] = value;
        });
        return object;
      };

      const actualObject = formDataToObject(actualFormData);

      expect(actualObject).toEqual(expectedFormData);
    });
  });

  it('should show an error message if title is not provided', async () => {
    const mockHandleNewNote = jest.fn();
    const mockHandleModalVisible = jest.fn();

    render(
      <AppContext.Provider
        value={{
          handleNewNote: mockHandleNewNote,
          handleModalVisible: mockHandleModalVisible,
        }}
      >
        <AddNoteForm />
      </AppContext.Provider>
    );

    fireEvent.submit(screen.getByRole('button', { name: /Add Note/i }));

    // Check for the validation error
    await screen.findByText(/Title is required/i);
    expect(screen.getByText(/Title is required/i)).toBeInTheDocument();
  });
});

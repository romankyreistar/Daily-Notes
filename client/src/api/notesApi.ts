import axiosInstance from './axiosInstance';
import { Note } from '@/types';

// Create a new note
export const createNote = async (data: FormData) => {
  const response = await axiosInstance.post('/notes/', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// Get all notes
export const getAllNotes = async () => {
  const response = await axiosInstance.get('/notes/');
  return response.data;
};

// Get a single note by ID
export const getNoteById = async (id: number) => {
  const response = await axiosInstance.get(`/notes/${id}/`);
  return response.data;
};

// Update a note by ID
export const updateNote = async (data: Note) => {
  if (!data.id) return;
  delete data.audio;

  const response = await axiosInstance.put(`/notes/${data.id}/`, data);
  return response.data;
};

// Delete a note by ID
export const deleteNote = async (id: number) => {
  const response = await axiosInstance.delete(`/notes/${id}/`);
  return response.data;
};

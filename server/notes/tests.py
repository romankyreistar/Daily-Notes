from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIClient
from django.core.files.uploadedfile import SimpleUploadedFile
from django.conf import settings
from notes.models import Note
from authentication.models import User
import os

class NoteTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            email='test@example.com',
            password='testpassword'
        )
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)

    def test_create_note_with_audio(self):
        note_data = {
            'title': 'Test Note',
            'description': 'This is a test note.',
            'isCompleted': False,
            'isImportant': True,
        }
        
        audio_file = SimpleUploadedFile(
            'test_audio.wav', 
            b'fakeaudio',
            content_type='audio/wav'
        )

        response = self.client.post('/api/v1/notes/', {
            **note_data,
            'audio': audio_file
        }, format='multipart')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        note = Note.objects.first()
        self.assertEqual(note.title, 'Test Note')
        self.assertEqual(note.description, 'This is a test note.')

        self.assertTrue(note.isImportant)
        self.assertFalse(note.isCompleted)

        audio_file_path = os.path.join(settings.MEDIA_ROOT, note.audio.name)
        self.assertTrue(os.path.exists(audio_file_path), "Audio file was not saved properly.")

    def test_read_note_with_audio(self):
        note_data = {
            'title': 'Test Note',
            'description': 'This is a test note.',
            'isCompleted': False,
            'isImportant': True,
        }
        
        audio_file = SimpleUploadedFile(
            'test_audio.wav', 
            b'fakeaudio',
            content_type='audio/wav'
        )
        
        response = self.client.post('/api/v1/notes/', {
            **note_data,
            'audio': audio_file
        }, format='multipart')
        
        note = Note.objects.first()

        response = self.client.get(f'/api/v1/notes/{note.id}/')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['data']['title'], 'Test Note')
        self.assertEqual(response.data['data']['description'], 'This is a test note.')
        self.assertTrue(response.data['data']['audio'].startswith('/media/audio/'))
        self.assertTrue(response.data['data']['isImportant'])
        self.assertFalse(response.data['data']['isCompleted'])


    def test_update_note_with_audio(self):
        note_data = {
            'title': 'Test Note',
            'description': 'This is a test note.',
            'isCompleted': False,
            'isImportant': True,
        }
        
        audio_file = SimpleUploadedFile(
            'test_audio.wav', 
            b'fakeaudio',
            content_type='audio/wav'
        )

        response = self.client.post('/api/v1/notes/', {
            **note_data,
            'audio': audio_file
        }, format='multipart')
        
        note = Note.objects.first()

        updated_data = {
            'title': 'Updated Test Note',
            'description': 'Updated description.',
            'isCompleted': True,
            'isImportant': False,
        }

        response = self.client.put(f'/api/v1/notes/{note.id}/', {
            **updated_data,
        }, format='multipart')

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        updated_note = Note.objects.get(id=note.id)
        self.assertEqual(updated_note.title, 'Updated Test Note')
        self.assertEqual(updated_note.description, 'Updated description.')

        self.assertFalse(updated_note.isImportant)
        self.assertTrue(updated_note.isCompleted)

        updated_audio_file_path = os.path.join(settings.MEDIA_ROOT, updated_note.audio.name)
        self.assertTrue(os.path.exists(updated_audio_file_path), "Updated audio file was not saved properly.")

    def test_delete_note(self):
        note_data = {
            'title': 'Test Note',
            'description': 'This is a test note.',
            'isCompleted': False,
            'isImportant': True,
        }
        
        audio_file = SimpleUploadedFile(
            'test_audio.wav', 
            b'fakeaudio',
            content_type='audio/wav'
        )

        response = self.client.post('/api/v1/notes/', {
            **note_data,
            'audio': audio_file
        }, format='multipart')
        
        note = Note.objects.first()

        response = self.client.delete(f'/api/v1/notes/{note.id}/')

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

        with self.assertRaises(Note.DoesNotExist):
            Note.objects.get(id=note.id)

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status, permissions

from applibs.response import prepare_success_response, prepare_error_response
from core import settings
from notes.models.notes import Note
from notes.serializer import NoteSerializer
from django.http import FileResponse

import os

class NoteListCreateView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]  

    def get(self, request):
        notes = Note.objects.filter(user=request.user)
        serializer = NoteSerializer(notes, many=True)
        return Response(prepare_success_response(serializer.data), status=status.HTTP_200_OK)

    def post(self, request):
        serializer = NoteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(prepare_success_response(serializer.data), status=status.HTTP_201_CREATED)
        return Response(prepare_error_response(serializer.errors), status=status.HTTP_400_BAD_REQUEST)

class NoteDetailView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self, pk, user):
        try:
            return Note.objects.get(pk=pk, user=user)
        except Note.DoesNotExist:
            return Response(prepare_error_response(), status=status.HTTP_404_NOT_FOUND)

    def get(self, request, pk):
        note = self.get_object(pk, request.user)
        if note is not Response:
            serializer = NoteSerializer(note)
            return Response(prepare_success_response(serializer.data), status=status.HTTP_200_OK)
        return note

    def put(self, request, pk):
        note = self.get_object(pk, request.user)
        if note is not Response:
            serializer = NoteSerializer(note, data=request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(prepare_success_response(serializer.data), status=status.HTTP_200_OK)
            return Response(prepare_error_response(), status=status.HTTP_400_BAD_REQUEST)
        return note

    def delete(self, request, pk):
        note = self.get_object(pk, request.user)
        if note is not Response:
            note.delete()
            return Response(prepare_success_response(), status=status.HTTP_204_NO_CONTENT)
        return note

class MediaFileView(APIView):
    permission_classes = [permissions.IsAuthenticated]  # Ensure only authenticated users can access the media files

    def get(self, request, path):
        file_path = os.path.join(settings.MEDIA_ROOT, path)
        
        if os.path.exists(file_path):
            return FileResponse(open(file_path, 'rb'))  # Serve the file
        else:
            return Response(prepare_error_response({"detail": "File not found."}), status=status.HTTP_404_NOT_FOUND)
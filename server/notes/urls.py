from django.urls import path

from notes.views import NoteDetailView, NoteListCreateView, MediaFileView

urlpatterns = [
    path('', NoteListCreateView.as_view(), name='note-create'),
    path('<int:pk>/', NoteDetailView.as_view(), name='note-detail'),
    path('media/<path:path>/', MediaFileView.as_view(), name='media-file'),
]
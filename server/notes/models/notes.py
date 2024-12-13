import os
from datetime import datetime
from django.db import models
from authentication.models import User
from notes.models.base import BaseModel

class Note(BaseModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notes')
    title = models.CharField(max_length=200)
    description = models.TextField()
    isCompleted = models.BooleanField(default=False)
    isImportant = models.BooleanField(default=False)
    audio = models.FileField(upload_to='', null=True, blank=True)

    def __str__(self):
        return self.title
    
    def save(self, *args, **kwargs):
        if self.audio:
            extension = os.path.splitext(self.audio.name)[1]
            user_id = self.user.id
            current_time = datetime.now().strftime('%Y%m%d%H%M%S')  
            new_name = f"{user_id}_{current_time}{extension}"

            self.audio.name = os.path.join('audio', new_name)

        super().save(*args, **kwargs)
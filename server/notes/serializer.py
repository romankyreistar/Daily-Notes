from rest_framework import serializers

from notes.models.notes import Note

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ['id', 'title', 'description', 'isCompleted', 'isImportant', 'audio', 'created_at', 'updated_at']
        extra_kwargs = {
            'id': {'read_only': True},
            'created_at': {'read_only': True},
            'updated_at': {'read_only': True},
        }

    # def create(self, validated_data):
    #     request = self.context.get('request')
    #     print('###########')
    #     print(request.user)
    #     return Note.objects.create(user=request.user, **validated_data)
    
    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        instance.description = validated_data.get('description', instance.description)
        instance.isCompleted = validated_data.get('isCompleted', instance.isCompleted)
        instance.isImportant = validated_data.get('isImportant', instance.isImportant)
        instance.save()
        return instance

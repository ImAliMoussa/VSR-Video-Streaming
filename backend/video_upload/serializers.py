from rest_framework import serializers

from .models import UploadVideoModel


# Serializers define the API representation.
class UploadVideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = UploadVideoModel
        fields = ('video_file', 'thumbnail_file', 'title', 'upload_date')

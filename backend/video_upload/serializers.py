from rest_framework import serializers

from .models import UploadVideoModel


# Serializers define the API representation.
class UploadVideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = UploadVideoModel
        fields = ('videoFile', 'thumbnailFile', 'title', 'uploadDate')

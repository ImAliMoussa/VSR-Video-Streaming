from rest_framework import serializers

from video.models import Video


class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = ['id', 'video_key_s3', 'title', 'upload_date', 'thumbnail_key_s3', 'audio_key_s3']

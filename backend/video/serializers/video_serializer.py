from rest_framework import serializers

from video.models import Video


class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = [
            "id",
            "videoKeyS3",
            "title",
            "uploadDate",
            "thumbnailKeyS3",
            "audioKeyS3",
        ]

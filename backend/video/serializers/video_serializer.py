from rest_framework import serializers

from video.models import Video


class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        # videoKeyS3 = models.CharField(max_length=128)
        # title = models.CharField(max_length=1000)
        # uploadDate = models.DateTimeField(default=datetime.now)
        # thumbnailKeyS3 = models.CharField(max_length=128)
        # audioKeyS3 = models.CharField(max_length=128)

        fields = [
            "id",
            "videoKeyS3",
            "title",
            "uploadDate",
            "thumbnailKeyS3",
            "audioKeyS3",
        ]

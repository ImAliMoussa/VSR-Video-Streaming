from datetime import datetime

from django.db import models

from .presigned_link import get_file_link


# Create your models here.
class Video(models.Model):
    videoKeyS3 = models.CharField(max_length=128)
    title = models.CharField(max_length=1000)
    uploadDate = models.DateTimeField(default=datetime.now)
    thumbnailKeyS3 = models.CharField(max_length=128)
    audioKeyS3 = models.CharField(max_length=128)
    likes = models.IntegerField(default=0)
    dislikes = models.IntegerField(default=0)
    views = models.IntegerField(default=0)
    duration = models.FloatField(default=0)
    fps = models.IntegerField(default=0)

    @property
    def thumbnailURL(self):
        return get_file_link(self.thumbnailKeyS3)

    @property
    def videoURL(self):
        return get_file_link(self.videoKeyS3)

    @property
    def audioURL(self):
        return get_file_link(self.audioKeyS3)

    @property
    def uploadTimeFormatted(self):
        return self.uploadDate.strftime("%m/%d/%Y, %H:%M:%S")

    def __str__(self):
        return self.title

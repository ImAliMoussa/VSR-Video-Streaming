from datetime import datetime

from django.db import models


# Create your models here.
class Video(models.Model):
    videoKeyS3 = models.CharField(max_length=128)
    title = models.CharField(max_length=1000)
    uploadDate = models.DateTimeField(default=datetime.now)
    thumbnailKeyS3 = models.CharField(max_length=128)
    audioKeyS3 = models.CharField(max_length=128)

    def __str__(self):
        return self.title

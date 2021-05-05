import uuid
from datetime import datetime

from django.db import models


# Create your models here.
class Video(models.Model):
    title = models.CharField(max_length=128)
    video_key_s3 = models.CharField(max_length=128)
    upload_date = models.DateTimeField(default=datetime.now)
    thumbnail_key_s3 = models.CharField(max_length=128)
    audio_key_s3 = models.CharField(max_length=128)

    def __str__(self):
        return self.title


def name_generator(instance, filename):
    new_name = str(uuid.uuid4())
    file_extension = filename.split('.')[-1]
    return f'{new_name}.{file_extension}'


class UploadVideoModel(models.Model):
    video_file = models.FileField(blank=False, null=False, upload_to=name_generator)
    thumbnail_file = models.ImageField(null=False, upload_to=name_generator)
    title = models.CharField(max_length=64)
    upload_date = models.DateTimeField(auto_now_add=True)

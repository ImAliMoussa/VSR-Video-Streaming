import uuid

from django.db import models


def name_generator(instance, filename):
    new_name = str(uuid.uuid4())
    file_extension = filename.split('.')[-1]
    return f'{new_name}.{file_extension}'


class UploadVideoModel(models.Model):
    video_file = models.FileField(blank=False, null=False, upload_to=name_generator)
    thumbnail_file = models.ImageField(null=False, upload_to=name_generator)
    title = models.CharField(max_length=64)
    upload_date = models.DateTimeField(auto_now_add=True)

from django.db import models
from datetime import datetime

# Create your models here.
class Video(models.Model):
    title = models.CharField(max_length=1000)
    url = models.URLField()
    upload_date = models.DateTimeField(default=datetime.now)
    thumbnail_url = models.URLField()
    audio_url = models.URLField()
    def __str__(self):
        return self.url

#https://video-super-resolution.fra1.digitaloceanspaces.com/BigBuckBunny.mp4

#thumbnaul
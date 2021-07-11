import os

from django.conf import settings

from video.models import Video
from .audiocreation import create_audio_file_from_video
from .upload import upload_file
from ..serializers import UploadVideoSerializer


def remove_file(file_name: str):
    file_full_path = os.path.join(settings.MEDIA_ROOT, file_name)
    os.remove(file_full_path)


def process_and_upload_video(serializer: UploadVideoSerializer):
    video_file = serializer.data["videoFile"]
    thumbnail_file = serializer.data["thumbnailFile"]
    title = serializer.data["title"]
    upload_date = serializer.data["uploadDate"]

    audio_file = create_audio_file_from_video(video_file)
    upload_file(video_file)
    upload_file(thumbnail_file)
    upload_file(audio_file)

    video = Video(
        title=title,
        videoKeyS3=video_file,
        thumbnailKeyS3=thumbnail_file,
        audioKeyS3=audio_file,
        uploadDate=upload_date,
        likes=0,
        dislikes=0,
        views=0
    )

    video.save()

    remove_file(video_file)
    remove_file(audio_file)
    remove_file(thumbnail_file)

    print("success")

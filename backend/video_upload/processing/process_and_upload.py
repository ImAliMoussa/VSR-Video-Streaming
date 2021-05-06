import os.path

from django.conf import settings

from .audiocreation import create_audio_file_from_video
from .upload import upload_file
from ..models import Video
from ..serializers import UploadVideoSerializer


def process_and_upload_video(serializer: UploadVideoSerializer):
    video_file = serializer.data['video_file']
    thumbnail_file = serializer.data['thumbnail_file']
    title = serializer.data['title']
    upload_date = serializer.data['upload_date']

    audio_file = create_audio_file_from_video(video_file)

    # full video file path
    video_path = os.path.join(settings.BASE_DIR, video_file[1:])
    upload_file(video_path)
    # upload_file(audio_file)
    # upload_file(thumbnail_file)

    video = Video(
        title=title,
        video_key_s3=video_file,
        thumbnail_key_s3=thumbnail_file,
        audio_key_s3=audio_file,
        upload_date=upload_date
    )
    video.save()

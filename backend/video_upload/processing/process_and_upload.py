from video.models import Video
from .audiocreation import create_audio_file_from_video
from .upload import upload_file
from ..serializers import UploadVideoSerializer


def process_and_upload_video(serializer: UploadVideoSerializer):
    video_file = serializer.data['video_file']
    thumbnail_file = serializer.data['thumbnail_file']
    title = serializer.data['title']
    upload_date = serializer.data['upload_date']

    audio_file = create_audio_file_from_video(video_file)
    upload_file(video_file)
    upload_file(thumbnail_file)
    upload_file(audio_file)

    video = Video(
        title=title,
        video_key_s3=video_file,
        thumbnail_key_s3=thumbnail_file,
        audio_key_s3=audio_file,
        upload_date=upload_date
    )
    video.save()
    print('sucess')

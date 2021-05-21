from video.models import Video

from ..serializers import UploadVideoSerializer
from .audiocreation import create_audio_file_from_video
from .upload import upload_file


def process_and_upload_video(serializer: UploadVideoSerializer):
    print("hello world")
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
    )

    video.save()
    print("success")

import json
import ntpath
import os
import subprocess

from django.conf import settings

from video.models import Video
from .audiocreation import create_audio_file_from_video
from .upload import upload_file
from ..serializers import UploadVideoSerializer


# https://stackoverflow.com/questions/3844430/how-to-get-the-duration-of-a-video-in-python
def get_duration_and_fps(filename):
    basename = ntpath.basename(filename)
    full_path = os.path.join(settings.MEDIA_ROOT, basename)
    result = subprocess.check_output(
        f'ffprobe -v quiet -show_streams -select_streams v:0 -of json "{full_path}"',
        shell=True).decode()
    fields = json.loads(result)['streams'][0]

    duration = fields['duration']
    fps = eval(fields['r_frame_rate'])
    return duration, fps


def remove_file(file_name: str):
    basename = ntpath.basename(file_name)
    file_full_path = os.path.join(settings.MEDIA_ROOT, basename)
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

    duration, fps = get_duration_and_fps(video_file)

    video = Video(
        title=title,
        videoKeyS3=video_file,
        thumbnailKeyS3=thumbnail_file,
        audioKeyS3=audio_file,
        uploadDate=upload_date,
        likes=0,
        dislikes=0,
        views=0,
        duration=duration,
        fps=fps
    )

    video.save()

    remove_file(video_file)
    remove_file(audio_file)
    remove_file(thumbnail_file)

    print("success")

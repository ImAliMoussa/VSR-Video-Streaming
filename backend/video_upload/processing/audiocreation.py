# import required libraries
import os
import uuid

from django.conf import settings
from vidgear.gears import WriteGear


def create_audio_file_from_video(video_path: str):
    # define a valid url
    # Define writer with default parameters
    writer = WriteGear(output_filename="Output.mp4", logging=True)

    # create a random audio filename
    audio_output_filename = str(uuid.uuid4())
    # file extension of audio file
    extension = '.aac'

    audio_path = os.path.join(settings.MEDIA_ROOT, audio_output_filename, extension)

    # format command to convert stream audio as 'output_audio.aac' as list
    ffmpeg_command_to_save_audio = [
        "-y",
        "-i",
        video_path,
        audio_path,
    ]  # `-y` parameter is to overwrite outputfile if exists

    # execute FFmpeg command
    writer.execute_ffmpeg_cmd(ffmpeg_command_to_save_audio)

    # safely close writer
    writer.close()
    return audio_path
